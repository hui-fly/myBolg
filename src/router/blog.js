const blogDB = require('../controller/blog')
const {succecssModel,errorModel} = require('../model/resModel')

const handleBlogRouter =  async (req,res)=>{
    const method = req.method
    if(req.path === '/api/blog/list' && method === 'GET') {
        const author = req.query.author||'';
        const keyword = req.query.keyword||'';
        const listData = await blogDB.getList(author, keyword)
        return Promise.resolve(new succecssModel(listData))
    }
    if(req.path === '/api/blog/detail' && method === 'GET') {
        const id = req.query.id
        const detailData = await blogDB.getDetail(id)
        return Promise.resolve(new succecssModel(detailData))
    }
    if(req.path === '/api/blog/new' && method === 'POST') {
        return {
            message:'blog'
        }
    }
}
module.exports = handleBlogRouter