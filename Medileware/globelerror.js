const globalError=((err,req,res,next)=>{
    err.statuscode=err.statuscode||500
    err.satuts = err.satuts || `error`
   if(process.env.NODE_ENV==`Devlopment`){
    sendErrorfordevelopmode(err,res)
   }else{
    sendErrorforproduction(err,res)
   }

   })

   const sendErrorfordevelopmode=(err,res)=>{
    res.status(err.statuscode).json({
        mess:err.message,
        satuts:err.satuts,
        error:err,
        stack:err.stack
    })
    
   }
   const sendErrorforproduction=(err,res)=>{
    res.status(err.statuscode).json({
        mess:err.message,
        satuts:err.satuts,
      
    })
    
   }

   module.exports=globalError