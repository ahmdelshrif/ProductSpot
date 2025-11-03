const mongoose=require('mongoose')
const dbconnection= ()=>{
    
mongoose.connect(process.env.Url_DB).then((conn)=>{
    console.log(conn.connection.host)
})
// .catch((err)=>{
//     console.error(err)
//     process.exit
// })

}

module.exports=dbconnection