const { exec } = require('../db/mysql.js')
exports.getList = (author,keyWord)=>{ // 获取文章列表
    let sql = 'select * from blogs where 1=1'
    if (author) {
        sql+=`and author='${author}'`
    }
    if(keyWord){
        sql+=`and keyWord='${keyWord}'`
    }
    // sql+=`order by createtime desc;`
    return exec(sql)
}
exports.getDetail = (id)=>{ // 获取文章列表
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}
