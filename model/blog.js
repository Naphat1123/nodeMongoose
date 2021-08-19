const mongoose = require('mongoose')
const mongo = require('mongodb')
const dbUrl = 'mongodb://localhost:27017/Blogdb'

mongoose.connect(dbUrl, {
    useNewUrlParser: true
})

const db = mongoose.connection
const Schema = mongoose.Schema

const blogSchema = new Schema({
    id: {
        type: Schema.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const Blogs = module.exports = mongoose.model('blogs', blogSchema)
module.exports.createBlog = (newBlog, callback) => {
    newBlog.save(callback)
}
module.exports.getAllBlogs = (data) => {
    Blogs.find(data)
}
module.exports.deleteBlog = (id, callback) => {
    Blogs.findOneAndDelete(id, callback)
}
module.exports.getBlogId = (id, callback) => {
    var query = {
        _id: id
    }
    Blogs.findOne(query, callback)
}
module.exports.updateBlog = (newBlog, callback) => {
    var query = {
        _id: newBlog.id
    }
    Blogs.findOneAndUpdate(query, {
        $set: {
            title: newBlog.title,
            blog: newBlog.blog,
            name: newBlog.name
        }
    }, { new: true }, callback)
}