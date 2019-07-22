const handleUserRouter = (req,res)=>{
    if(req.path =='/api/user/login' && req.method == 'POST') {
        return {
            message:'login'
        }
    }
}
module.exports = handleUserRouter