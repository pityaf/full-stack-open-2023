import { useState } from 'react';

import blogService from '../services/blogService';
import loginService from '../services/loginService';
import Blog from '../components/Blog'
import Notification from './Notification';

const Blogs = (props) => {

    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);    
    const [url, SetURL] = useState(null);  

    const [loginVisible, setLoginVisible] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [errorType, setErrorType] = useState(''); //login, logout

    const hideWhenVisible = { display: loginVisible ? 'none' : ''};
    const showWhenVisible = { display: loginVisible ? '' : 'none'};

    const styleInput = {
            width: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '5px'
        }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newBlog = {
            title,
            author,
            url,
        }

        try {

            await blogService.create(newBlog, loginService.getToken())

            setTitle(null);
            setAuthor(null);
      
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
                <div style={ showWhenVisible }>
                    <h3>Add a new blog:</h3>
                    <form onSubmit={ handleSubmit }>
                        <div style={ styleInput }>
                            <label>Title:</label>
                            <input type="text" className="title" id="title" value={ title } onChange={ ({ target }) => setTitle(target.value) } />
                        </div>

                        <div style={ styleInput }>
                            <label>Author:</label>
                            <input type="text" className="author" id="author" value={ author } onChange={ ({ target }) => setAuthor(target.value) } />
                        </div>

                        <div style={ styleInput }>
                            <label>URL:</label>
                            <input type="text" className="url" id="url" value={ url } onChange={ ({ target }) => SetURL(target.value) } />
                        </div>
                        <button type="submit">Add blog</button>
                    </form>
                    <button onClick={() => setLoginVisible(false)}>hide</button>
                </div>
            </div>
            <hr />
            {
                props.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} setRefreshBlog={ props.setRefreshBlog } refreshBlog={ props.refreshBlog }/>
                )
            }
        </div>
    )
}
  
  export default Blogs