
const env = process.env.NODE_ENV;

let MYSQL_CONF
if(env === 'development'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        port:'3306',
        password:'123456',
        database:'myblog',
    }
}
module.exports = {
    MYSQL_CONF,
}