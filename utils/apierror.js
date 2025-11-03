class ApiError extends Error {
    constructor(message,statuscode)
    {
        super(message)
        this.statuscode=statuscode
        this.satuts=`${statuscode}`.startsWith(4) ? "faild" :"error"
        this.isOprational=true;
    }
}

module.exports=ApiError