const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const queryString = require('querystring')
const {set,get} = require('./src//db/redis.js')
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}
const getPostData = (req)=>{
    let promise = new Promise((resolve,reject)=>{
        if(req.method!=='POST'||req.headers['content-type']!=='application/json') {
            resolve({});
            return
        }
        let postData='';
        req.on('data',chunk=>{   // chunk是一个Buffer,typeof(Buffer)竟然返回object
            postData+=chunk.toString();
        })
        req.on('end',()=>{
            if(!postData) {
                resolve({})
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}
const requestTest = (req, res)=>{
    res.setHeader('Content-type','application/json')
    const url = req.url;
    req.query = queryString.parse(url.split('?')[1])
    req.path = url.split('?')[0];
    const cookieStr = req.headers.cookie||'';
    req.cookie={};
    cookieStr.split(',').forEach((item) => {
        if(!item){
            return
        }
        const arr = item.split('=')
        const key = arr[0]
        const value = arr[1]
        req.cookie[key] = value
    });

    let needSetCookie=false;
    let userId = req.cookie.userid;
    if(!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        set(userId,{})
    }
    req.sessionId = userId
    get(req.sessionId).then((sessionData)=>{
        if(!sessionData) {
            set(req.sessionId,{})
            req.session = {}
        }else{
            req.session = sessionData
        }
        return getPostData(req)
    }).then((postData)=>{
        req.body = postData;
        const blogResult = handleBlogRouter(req,res)
        const userResult = handleUserRouter(req,res)
        if(blogResult){
            blogResult.then((blogData)=>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)      // res.end方法必须返回一个sting或者Buffer,否则会报错  The "chunk" argument must be one of type string or Buffer
                )
            })
            return
        }
        if(userResult) {
            userResult.then((userData)=>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
    
}
module.exports = requestTest