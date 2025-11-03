const qs = require("qs");

class Apifeauters {
  constructor(mongoosequary, querystring) {
    this.mongoosequary = mongoosequary;
    this.querystring = querystring;
  }
  fliteration = () => {
    //filtration
    const querystring = { ...this.querystring };
    const Exclude = ["page", "limit", "sort", `fields`, "keyword"];
    //Applay filtration using [gte| gt |lte | lt]
    // احذف الحاجات اللي مش عايزها
    Exclude.forEach((value) => delete querystring[value]);
    //{price=22.4} or {price[gte]=22}
    // هنا نحول object → query string
    let queryStr = qs.stringify(querystring);
    //"price[gte]=22"
    // بعدين نرجعها object nested
    let queryObj = qs.parse(queryStr);
    //{price:{gte:22}}
    // استبدل الـ operators (gte, gt, lte, lt)
    let queryJSON = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    // {price:{$gte:22}}
    let newquerystring = JSON.parse(queryJSON);
    this.mongoosequary = this.mongoosequary.find(newquerystring);

    return this;
  };

  sorting = () => {
    if (this.querystring.sort) {
      let sort = this.querystring.sort;
      sort = sort.split(`,`).join(" ");
      this.mongoosequary = this.mongoosequary.sort(sort);
    }
    return this;
  };

  fields = () => {
    if (this.querystring.fields) {
      let fields = this.querystring.fields.split(`,`).join(" ");
      this.mongoosequary = this.mongoosequary.select(fields);
    }
    return this;
  };

  search = (modelname) => {
    if (this.querystring.keyword) {
      let query = {};
      if (modelname === "products") {
        query.$or = [
          { title: { $regex: this.querystring.keyword, $options: `i` } },
          { discrepation: { $regex: this.querystring.keyword, $options: `i` } },
        ];
      } else {
        query = { name: { $regex: this.querystring.keyword, $options: `i` }, };
      }
      this.mongoosequary = this.mongoosequary.find(query);
    }
    return this;
  };

  paganation = (countdoc) => {
    let pages = {};
    // هنا بنقرأ page وال limit من querystring لو موجودين
    const page = this.querystring.page * 1 || 1;
    const limit = this.querystring.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const endindex = page * limit;

    // نضيفهم للكائن pages
    pages.page = page;
    pages.limit = limit;
    pages.skip = skip;
    pages.numofpage = Math.ceil(countdoc / limit);

    if (endindex < countdoc) {
      pages.next = page + 1;
    }
    if (skip > 0) {
      pages.prev = page - 1;
    }
    // نعدل الـ query
    this.mongoosequary = this.mongoosequary.limit(limit).skip(skip);
    // نخزن pages في الكائن نفسه عشان ممكن نحتاجها بعدين
    this.pages = pages;

    return this; // للـ chaining
  };
}

module.exports = Apifeauters;
