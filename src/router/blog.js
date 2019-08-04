const blogDB = require('../controller/blog')
const {succecssModel,errorModel} = require('../model/resModel')

const handleBlogRouter =  async (req,res)=>{
    const method = req.method
    const id = req.query.id
    if(req.path === '/api/blog/list' && method === 'GET') {
        const author = req.query.author||'';
        const keyword = req.query.keyword||'';
        const listData = await blogDB.getList(author, keyword)
        return Promise.resolve(new succecssModel(listData))
    }
    if(req.path === '/api/blog/detail' && method === 'GET') {
        const id = req.query.id
        const detailData =  blogDB.getDetail(id)
        return detailData.then((data)=>{
            return new succecssModel(data)
        })
    }
    if(req.path === '/api/blog/new' && method === 'POST') {
        const newData = blogDB.newBlog(req.body)
        return newData.then((data)=>{
            if(data) {
                return new succecssModel(data)
            }
            else {
                return new errorModel('新建博客失败')
            }
        })
    }
    if(req.path === '/api/blog/update' && method === 'POST') {
        const updateData = blogDB.updateBlog(id, req.body)
        return updateData.then((data)=>{
            if(data) {
                return new succecssModel(data)
            }
            else {
                return new errorModel('更新博客失败')
            }
        })
    }
    if(req.path === '/api/blog/del' && method === 'POST') {
        const delData = blogDB.delBlog(id, req.body)
        return delData.then((data)=>{
            if(data) {
                return new succecssModel(data)
            }
            else {
                return new errorModel('删除博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter