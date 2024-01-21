import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification'
import blogService from './services/blogService';
import loginService from './services/loginService';

const App = () => {
  const [user, setUser] = useState(null);  
  const [blogs, setBlogs] = useState([]);

  const [refreshBlog, setRefreshBlog] = useState(false)

  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(''); //login, logout

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await blogService.getAll()
        setBlogs(response.sort((a, b) => {
          return b.likes - a.likes;
        }))
      } catch(error) {
        console.log(error)
      }
    }
    fetchData();
  }, [refreshBlog]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null);

    setErrorMessage('Logout succesful');
    setErrorType('addition')

    window.localStorage.removeItem('loggedUser')

    setTimeout(() => {
      setErrorMessage(null);
      setErrorType(null);
    }, 3000);
  }


  if(user === null) {
    return <Login setUser={ setUser } />
  } else {
    return (
      <>
        <Notification message={ errorMessage } type={ errorType } />
        <div>
          <p>Hi!, { user.name }</p>
          <p>not you?<button onClick={ handleLogout }>logout</button></p>
        </div>
        <Blogs blogs={ blogs } user={ user } setRefreshBlog={ setRefreshBlog } refreshBlog={ refreshBlog }/>
      </>
    )
  }
};

export default App;