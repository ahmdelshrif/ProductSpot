const mongoose = require('mongoose')

const Category = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Category is required"],
        unique: [true,"Category must be unique"],
        minlength: [3, "too short Category name"],
        maxlength: [32, "too long Category name"],
      },
      
    slug: {
        type: String,
        lowercase: true
    },
    image: {
        type: String,
        default: 'default.jpg'
      }

}, {timestamps:true})

const Imageurl=(doc)=>{
  const Imageurl=`${process.env.Base_URL}/category/${doc.image}`
  doc.image=Imageurl
}

Category.post(`init`, (doc)=>{
  Imageurl(doc)
})

Category.post(`save`, (doc)=>{
  Imageurl(doc)
})

const CategoryModels = mongoose.model("Category", Category) // الأفضل تبدأ بحرف كبير

module.exports = CategoryModels
