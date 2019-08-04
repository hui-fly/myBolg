const crypto = require('crypto')
const SECRET_KEY = 'mtuf_j98*#'
function getPassword (password) {
    let str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}
function md5 (content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}
module.exports = getPassword