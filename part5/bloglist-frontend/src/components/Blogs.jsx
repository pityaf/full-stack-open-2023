import { useState, useEffect } from 'react';

import blogService from '../services/blogs';

const Blogs = () => {
    
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, []);

    return (
        <>
            <h2>blogs</h2>
            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </>
    )
}
  
  export default Blogs