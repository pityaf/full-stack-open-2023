import { useState } from 'react';

import blogService from '../services/blogService';
import loginService from '../services/loginService';
import Blog from '../components/Blog'
import BlogForm from './BlogForm';
import Notification from './Notification';

const Blogs = (props) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');    
    const [url, setURL] = useState('');  

    const [loginVisible, setLoginVisible] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [errorType, setErrorType] = useState(''); //login, logout

    const hideWhenVisible = { display: loginVisible ? 'none' : ''};
    const showWhenVisible = { display: loginVisible ? '' : 'none'};

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newBlog = {
            title,
            author,
            url,
        }

        try {

            await blogService.create(newBlog, loginService.getToken())

            setTitle('');
            setAuthor('');
      
            setErrorMessage(`a new blog ${ title } by ${ author }`);
            setErrorType('addition')

            props.setRefreshBlog(!props.refreshBlog)
      
            setTimeout(() => {
              setErrorMessage(null);
              setErrorType(null);
            }, 3000);

        } catch (e) {
            setErrorMessage('Wrong Payload');
            setErrorType('error')
      
            setTimeout(() => {
              setErrorMessage(null);
              setErrorType(null);
            }, 3000);
        }
    }

    return (
        <div>
            <h2>Blogs!</h2>
            <hr />
            <Notification message={ errorMessage } type={ errorType } />
            <div>
                <div style={ hideWhenVisible }>
                    <button onClick={() => setLoginVisible(true)}>add blog</button>
                </div>
                <div className='blog-form' style={ showWhenVisible }>
                    <h3>Add a new blog:</h3>
                    <BlogForm  handleSubmit={ handleSubmit } title={ title } setTitle={ setTitle } author={ author } setAuthor={ setAuthor } url={ url } setURL={ setURL } />
                    <button onClick={() => setLoginVisible(false)}>hide</button>
                </div>
            </div>
            <hr />
            <ul style={ { padding: 0 } }>
            {   
                props.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} setRefreshBlog={ props.setRefreshBlog } refreshBlog={ props.refreshBlog }/>
                )
            }
            </ul>
        </div>
    )
}
  
  export default Blogs