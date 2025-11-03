const sharp=require(`sharp`)
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ApiError=require(`../utils/apierror`)

exports.uploadSinglefile=(fileName)=>{

    // const multerStorage = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     console.log(`aaa`)
    //     cb(null, path.join(__dirname, '../utils/uploading/category'));
    //   },
    //   filename: function (req, file, cb) {
    //     const ext = file.mimetype.split('/')[1];
    //     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    // req.body.image=filename
    //     cb(null, filename);
    //   }
    // });
    
const multerfilter=function(req,file,cb){
    if(file.mimetype.startsWith(`image`))
    {
      cb(null, true)
  
    }else{
      cb(new ApiError(`only image`,400),false)
    }
  }
  
  
  const upload = multer({storage:multer.memoryStorage() ,fileFilter:multerfilter});
 
 return  uploadimage = upload.single(fileName);
}

exports.uploadMaxOFfiles=(filedsofarray)=>{

  // const multerStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     console.log(`aaa`)
  //     cb(null, path.join(__dirname, '../utils/uploading/category'));
  //   },
  //   filename: function (req, file, cb) {
  //     const ext = file.mimetype.split('/')[1];
  //     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
  // req.body.image=filename
  //     cb(null, filename);
  //   }
  // });
  
const multerfilter=function(req,file,cb){
  if(file.mimetype.startsWith(`image`))
  {
    cb(null, true)

  }else{
    cb(new ApiError(`only image`,400),false)
  }
}


const upload = multer({storage:multer.memoryStorage() ,fileFilter:multerfilter});

return  uploadimage = upload.fields(filedsofarray);
}