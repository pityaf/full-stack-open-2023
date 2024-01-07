const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save();
}, 100000)

beforeEach(async () => {
    await Blog.deleteMany({});

    for(let blog of helper.initialBlogs) {
        let blogObj = new Blog(blog);
        await blogObj.save()
    }

}, 100000)

describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.UserInDB()
    
        const newUser = {
          username: 'pityafinwe',
          name: 'Paolo Cantoreggi',
          password: 'ueesl',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.UserInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
      })

      test('creation fails with proper statuscode and message if username already taken', async () => {
            const usersAtStart = await helper.UserInDB()
        
            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            }
        
            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        
            expect(result.body.error).toContain('expected `username` to be unique')
        
            const usersAtEnd = await helper.UserInDB()
            expect(usersAtEnd).toEqual(usersAtStart)
      })
})

test('a specific blog can be viewed', async () => {
    const blogAtStart = await helper.blogInDB();
    const blogToView = blogAtStart[0];

    const resultBlog = await api    
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView);
})

test('The unique id property of the blog is named id', async () => {
    const blogAtStart = await helper.blogInDB();
    const blogToView = blogAtStart[0];

    const result = await api    
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(result).toBeDefined();
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

test('a specific blog is within the returned blogs', async () => {
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
        likes: 7,
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

test('a blog without likes is added with value of zero', async () => {
    const blog = {
        title: 'async/await simplifies making async calls',
        author: 'Me, myself, I...but test',
        url: 'http://test',
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201);

    const blogAtEnd = await helper.blogInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogAtEnd.map(n => n.likes);
    expect(contents).toContain(0)

})

test('a blog without title is not added', async () => {
    const blog = {
        author: 'Me, myself, I...but test',
        url: 'http://test',
        likes: 7,
    }
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400);

    const blogAtEnd = await helper.blogInDB();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
})

test('a blog without URL is not added', async () => {
    const blog = {
        title: 'async/await simplifies making async calls',
        author: 'Me, myself, I...but test',
        likes: 7,
    }
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400);

    const blogAtEnd = await helper.blogInDB();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
})

test('a blog without both title and URL is not added', async () => {
    const blog = {
        author: 'Me, myself, I...but test',
        likes: 7,
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
