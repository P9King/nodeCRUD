
//need login 
exports.needLogin = async(req, res, next)=>{
    res.send("<script>alert('require login')</script>")
}