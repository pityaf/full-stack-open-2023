const _ = require('lodash');

const dummy = (blog) => {
    return 1;
}

const totalLikes = (blog) => {
    if(blog.length === 0) {
        return 0;
    }

    const totalLikes = blog.map(item => item.likes);

    return totalLikes.reduce((totalLikes, currentLike) => totalLikes + currentLike)
}

const favoriteBlog = (blog) => {
    const blogLikes = blog.map(item => item.likes);
    const mostLikedIndex = blogLikes.indexOf(Math.max(...blogLikes));

    return {
        title: blog[mostLikedIndex].title,
        author: blog[mostLikedIndex].author,
        likes: blog[mostLikedIndex].likes,
    }
}

const mostBlogs = (blog) => {
    const authors = blog.map(item => item.author);

    const countAuthor = _.countBy(authors);

    let likes = 0;
    let author = '';
    for(const key in countAuthor) {
        if(countAuthor[key] > likes) {
            likes = countAuthor[key]
            author = key;
        }
    }

    return(        
        {
            author: author,
            blogs: likes,
        }
    );
}

const mostLikes = (blog) => {
    const authors = Object.keys(_.countBy(blog, 'author'));
    const likes = Array(authors.length).fill(0);

    blog.forEach(item => {
        if(authors.includes(item.author)) {
            likes[authors.indexOf(item.author)] += item.likes
        }
    })

    const index = likes.indexOf(Math.max(...likes));

    return(        
        {
            author: authors[index],
            likes: likes[index],
        }
    );
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}