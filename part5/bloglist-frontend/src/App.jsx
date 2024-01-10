import { useState } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      {
        user === null
          ? <Login /> 
          : <Blogs blogs={ blogs } />
      }
    </div>
  )
};

export default App;