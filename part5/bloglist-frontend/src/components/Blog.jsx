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
    <li className='blog' style={ blogStyle }>
      <div className='basicInfo'>
        <p><strong>Title:</strong> { blog.title }</p>
        <p><strong>Author:</strong> { blog.author }</p>
        <button className='toggableContent' onClick={ onClick }>{ info }</button>
        <hr />
      </div>
      <div className={ visibleInfo.toString() } style={ visibleStyle }>
        <p><strong>Likes:</strong> { blog.likes } <button className='addLike' onClick={ addLike }>add like</button></p>
        <p>{ blog.url }</p>
        <hr />
        <button onClick={ deleteBlog }>delete blog</button>
      </div>
    </li>  
  )
}

export default Blog