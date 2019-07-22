const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const queryString = require('querystring')
const requestTest = (req, res)=>{
    res.setHeader('Content-type','application/json')
    const resData = {
        name:'huifly',
        age:18,
    }
    const url = req.url;
    req.query = queryString.parse(url.split('?')[1])
    req.path = url.split('?')[0];
    // handleUserRouter(req,res).then((userData)=>{
    //     if(userData){
    //         res.end(
    //             JSON.stringify(userData)
    //         )
    //         return
    //     }
    //     res.end(JSON.stringify(resData))
    // })
    handleBlogRouter(req,res).then((blogData)=>{
        if(blogData){
            res.end(
                JSON.stringify(blogData)
            )
            return
        }
    res.end(JSON.stringify(resData))
    })
}
module.exports = requestTest