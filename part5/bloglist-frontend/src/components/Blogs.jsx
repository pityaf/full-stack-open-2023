import { useState } from 'react';

import blogs from '../services/blogs';
import loginService from '../services/loginService';
import Blog from '../components/Blog'
import Notification from './Notification';

const Blogs = (props) => {

    const [title, setTile] = useState(null);
    const [author, setAuthor] = useState(null);    
    const [url, SetURL] = useState(null);  

    const [errorMessage, setErrorMessage] = useState('');
    const [errorType, setErrorType] = useState(''); //login, logout

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

            await blogs.create(newBlog, loginService.getToken())

            setTile(null);
            setAuthor(null);
      
            setErrorMessage(`a new blog ${ title } by ${ author }`);
            setErrorType('addition')
      
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
            <h3>Add a new blog:</h3>
            <form onSubmit={ handleSubmit }>
                <div style={ styleInput }>
                    <label>Title:</label>
                    <input type="text" className="title" id="title" value={ title } onChange={ ({ target }) => setTile(target.value) } />
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
            <hr />
            {
                props.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div>
    )
}
  
  export default Blogs