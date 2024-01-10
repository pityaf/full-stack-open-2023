import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');      
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
      blogService.getAll().then(blogs =>
          setBlogs( blogs )
      )  
  }, []);

  if(user === null) {
    return <Login /> 
  } else {
    return (
      <>
        <Credentials />
        <Blogs blogs={ blogs } />
      </>
    )
  }
};

export default App;