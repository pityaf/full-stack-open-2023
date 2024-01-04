const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog')

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

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
} , 100000)

test('blogs are returned as json', async () => {
    await api   
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blog are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
    'The Blog Title number 2'
    )
})

afterAll(async () => {
    await mongoose.connection.close()
})
