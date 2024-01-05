const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(helper.initialBlogs[0]);

    await blogObject.save();
    blogObject = new Blog(helper.initialBlogs[1]);
    
    await blogObject.save();
} , 100000)

test('a specific blog can be viewed', async () => {
    const blogAtStart = await helper.blogInDB();
    const blogToView = blogAtStart[0];

    const resultBlog = await api    
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView);
})

test('a blog can be delete', async () => {
    const blogAtStart = await helper.blogInDB();
    const blogToDelete = blogAtStart[0];

    const resultBlog = await api    
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogInDB();

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title);

    expect(contents).not.toContain(blogToDelete.title);
})

test('blogs are returned as json', async () => {
    await api   
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blog are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
    'The Blog Title number 2'
    )
})

test('a valid blog can be added', async () => {
    const blog = {
        title: 'async/await simplifies making async calls',
        author: 'Me, myself, I...but test',
        url: 'http://test',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogAtEnd = await helper.blogInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogAtEnd.map(n => n.title);
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('a blog without title is not added', async () => {
    const blog = {
        author: 'Me, myself, I...but test',
        url: 'http://test',
        likes: 7
    }
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400);

    const blogAtEnd = await helper.blogInDB();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
})

afterAll(async () => {
    await mongoose.connection.close()
})
