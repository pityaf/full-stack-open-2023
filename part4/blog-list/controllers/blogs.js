const blogRouter = require('express').Router();
const Blog = require('../models/blog')

blogRouter.get('/', async(request, response) => {
    const blog = await Blog.find({})
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

    if(!body) {
        response.status(400).end();
    }

    if(body.title === undefined || body.url === undefined) {
        response.status(400).end();
    } else {
        const post = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0
        });

        try {
            const savedPost = await post.save();
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