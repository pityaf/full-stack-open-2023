import { useState } from 'react';

import blogService from '../services/blogService';

const Blog = ({ blog, setRefreshBlog, refreshBlog }) => {

  const [visibleInfo, setVisibleInfo] = useState(false);
  const [visibleStyle, setVisibleStyle] = useState({ display: 'none'});
  const [info, setInfo] = useState('view more');

  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(''); //login, logout

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onClick = () => {
    if(visibleInfo) {
      setVisibleInfo(false)
      setInfo('view more')
      setVisibleStyle({ display: 'none' })
    } else {
      setVisibleInfo(true)
      setInfo('view less')
      setVisibleStyle({ display: 'block' })
    }
  }

  const deleteBlog = async () => {
    try {
      await blogService.deleteBlog(blog);
      setRefreshBlog(!refreshBlog)
    } catch(e) {

    }
  }

    const addLike = async () => {
    try {

      blog.likes = blog.likes + 1;

      await blogService.updateBlog(blog);
      setRefreshBlog(!refreshBlog)
    } catch(e) {

    }
  }

  return (
    <div style={ blogStyle }>
      <div>
        <p><strong>Title:</strong> { blog.title }</p>
        <button onClick={ onClick }>{ info }</button>
        <hr />
      </div>
      <div style={ visibleStyle }>
        <p><strong>Likes:</strong> { blog.likes } <button onClick={ addLike }>add like</button></p>
        <p><strong>Author:</strong> { blog.author }</p>
        <p>{ blog.url }</p>
        <hr />
        <button onClick={ deleteBlog }>delete blog</button>
      </div>
    </div>  
  )
}

export default Blog