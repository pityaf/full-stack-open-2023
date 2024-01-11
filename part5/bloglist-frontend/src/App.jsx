import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification'
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);  
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(''); //login, logout

  useEffect(() => {
      blogService.getAll().then(blogs =>
          setBlogs( blogs )
      )  
  }, []);

  const handleLogout = () => {
    setUser(null);

    setErrorMessage('Logout succesful');
    setErrorType('addition')

    setTimeout(() => {
      setErrorMessage(null);
      setErrorType(null);
    }, 3000);
  }


  if(user === null) {
    return <Login setUser={ setUser } setErrorMessage={ setErrorMessage } setErrorType={ setErrorType } errorMessage={ errorMessage } errorType={ errorType } /> 
  } else {
    return (
      <>
        <Notification message={ errorMessage } type={ errorType } />
        <div>
          <p>Hi!, { user.name }</p>
          <p>not you?<button onClick={ handleLogout }>logout</button></p>
        </div>
        <Blogs blogs={ blogs } />
      </>
    )
  }
};

export default App;