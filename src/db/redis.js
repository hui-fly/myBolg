const redis = require('redis')
const { REDIS_CONF } = require('../conf/db.js')

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('err',(err)=>{
    console.log(err)
})

exports.set = (key,value)=>{
    if(typeof value ==='object'){
        value=JSON.stringify(value)
    }
    redisClient.set(key,value,redis.print)
}
exports.get = (key)=>{
    return new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
}