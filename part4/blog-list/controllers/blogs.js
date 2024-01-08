const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if(authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
}

blogRouter.get('/', async(request, response) => {
    const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blog)
  })

blogRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if(blog) {
            response.json(blog);
        } else {
            response.status(404).end();
        }
    } catch(e) {
        next(e)
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);

    if(!body || !user) {
        response.status(400).end();
    }

    if(body.title === undefined || body.url === undefined) {
        response.status(400).end();
    } else {
        const post = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0,
            user: user._id
        });

        try {
            const savedPost = await post.save();
            user.blogs = user.blogs.concat(savedPost._id);
            await user.save();
            response.status(201).json(savedPost);
        } catch(e) {
            next(e);
        }
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch(e) {
        next(encodeURI)
    }
  })
  
blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    if(body.title === undefined || body.url === undefined) {
        response.status(400).end();
    } else {
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }
    
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(blog)
    }
})

module.exports = blogRouter;