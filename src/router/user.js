const userDB = require('../controller/user')
const {succecssModel,errorModel} = require('../model/resModel')
const {set} = require('../db/redis')
const handleUserRouter = (req,res)=>{
    if(req.path =='/api/user/login' && req.method == 'POST') {
        const loginData = userDB.login(req.body.username,req.body.password)
        return loginData.then((data)=>{
            if(data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname
                set(req.sessionId,req.session)
                return new succecssModel()
            }
            else {
                return new errorModel('账号或密码错误')
            }
        })
    }
}
module.exports = handleUserRouter