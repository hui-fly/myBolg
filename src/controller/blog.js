const { exec } = require('../db/mysql.js')
const xss = require('xss')
exports.getList = (author,keyWord)=>{ // 获取文章列表
    let sql = 'select * from blogs where 1=1'
    if (author) {
        sql+=`and author='${author}'`
    }
    if(keyWord){
        sql+=`and keyWord='${keyWord}'`
    }
    sql+=`order by createtime desc;`
    return exec(sql)
}
exports.getDetail = (id)=>{ // 获取文章列表
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}
exports.newBlog = (data)=>{
    const content = xss(data.content)
    const title = xss(data.title)
    const author = data.author
    const createtime = Date.now()
    const sql = `
        insert into blogs(title,content,author,createtime)values 
        ('${title}', '${content}', '${author}', ${createtime})
    `
    return exec(sql).then((insertData)=>{
        if(insertData.affectedRows>0){
            return {
                id:insertData.insertId
            }
        }
        return false
    })
}
exports.updateBlog = (id,data={})=>{
    const sql=`
        update blogs set title= '${data.title}',content= '${data.content}' where id=${id}
    `
    return exec(sql).then((updateData)=>{
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}
exports.delBlog = (id,data)=>{
    const author = data.author
    const sql = `
        delete from blogs where id=${id} and author='${author}'
    `
    return exec(sql).then((delData)=>{
        if(delData.affectedRows>0){
            return true
        }
        return false
    })
}
