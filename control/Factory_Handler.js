const asyncHandler = require("express-async-handler");
const ApiError = require(`../utils/apierror`);
const Apifeauters = require("../utils/Apifeatures");
const slugify = require("slugify");

//Delete documents
exports.DeleteOneDoc = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const Doc = await Model.findOneAndDelete({ _id: id });
    if (!Doc) {
      return next(new ApiError(`No found ID ! `, 404));
    }

    res.status(200).json(`DEL is succsfully`);
  });
};
//Update documents
exports.UpdateOneDoc = (Model, docName) => {
  return asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (req.User) {
      req.body.user = req.User._id;
    }
    if (docName == "Products") {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      let Doc = await Model.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (!Doc) {
        return next(new ApiError(` Not found 404 !!`, 404));
      }

      await Doc.save();

      res.status(201).json({ Data: Doc });
    } else {
      if (req.body.name) {
        req.body.slug = slugify(req.body.name);
      }
      let Doc = await Model.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (!Doc) {
        return next(new ApiError(` Not found 404 !!`, 404));
      }

      await Doc.save();
      res.status(201).json({ Data: Doc });
    }
  });
};
//get documents
exports.getDoc = (Model, populateoption) => {
  return asyncHandler(async (req, res, next) => {
    let Doc;
    const id = req.params.id;
    let Apifeauter = new Apifeauters(Model.findById(id), req.query).fields();
    const { mongoosequary } = Apifeauter;
    if (populateoption) {
      Doc = mongoosequary.populate(populateoption);
    }
    Doc = await mongoosequary;
    if (!Doc) {
      return next(new ApiError(` Not found 404 !!`, 404));
    }
    res.status(201).json({ Data: Doc });
  });
};
//create documents
exports.CreateDoc = (Model, docName) => {
  let doc;
  return asyncHandler(async (req, res, next) => {
    if (docName == `Products`) {
      req.body.slug = slugify(req.body.title);
      doc = await Model.create(req.body);
    } else {
      req.body.slug = slugify(req.body.name);
      doc = await Model.create(req.body);
    }
    res.status(201).json({ Data: doc });
  });
};

//get All documents
exports.getAllDoc = (Model, docName) => {
  return asyncHandler(async (req, res) => {
    const coundoc = await Model.countDocuments();
    if (req.filterobject) {
      let Apifeauter = new Apifeauters(Model.find(req.filterobject), req.query)
        .fliteration()
        .fields()
        .sorting()
        .search(docName)
        .paganation(coundoc);

      const { mongoosequary, pages } = Apifeauter;

      //Exxcute
      const Doc = await mongoosequary;

      res.status(201).json({ resulte: Doc.length, pages, Data: Doc });
    } else {
      let Apifeauter = new Apifeauters(Model.find(), req.query)
        .fliteration()
        .fields()
        .sorting()
        .search(docName)
        .paganation(coundoc);

      const { mongoosequary, pages } = Apifeauter;
      //Exxcute
      const Doc = await mongoosequary;

      res.status(201).json({ resulte: Doc.length, pages, Data: Doc });
    }
  });
};
