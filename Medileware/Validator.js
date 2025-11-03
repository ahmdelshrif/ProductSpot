const { validationResult } = require('express-validator');
const validatorErorr=
(req,res,next)=>{
    const errors=validationResult(req)
    console.log(errors)
    if(!errors.isEmpty())
    {
     return res.status(404).json({errors:errors.array()})
    }
    next()
    }
module.exports=validatorErorr