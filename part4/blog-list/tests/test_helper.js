const Blog = require('../models/blog');


const initialBlogs = [
    {
        title: 'The Blog Title',
        author: 'Me, myself, I',
        url: 'http://test',
        likes: 2
    },
    {
        title: 'The Blog Title number 2',
        author: 'Me, myself, I',
        url: 'http://test',
        likes: 2
    }
];

const nonExistingId = async () => {
    const blog = new Blog({ title: 'will remove this soon'});
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
}

const blogInDB = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, 
    nonExistingId, 
    blogInDB,
}