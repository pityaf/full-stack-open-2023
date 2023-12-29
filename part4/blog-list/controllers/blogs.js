const blogRouter = require('express').Router();
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogRouter.get('/:id', (request, response) => {
    Blog.findById(request.params.id)
        .then(post => {
            if(post) {
                response.json(post);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
})

blogRouter.post('/', (request, response) => {
    const body = request.body;
    const post = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    });

    post.save()
        .then(savedPost => {
            response.json(savedPost);
        })
        .catch(error => next(error));
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
blogRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const post = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedPost => {
        response.json(updatedPost)
        })
        .catch(error => next(error))
})

module.exports = blogRouter;