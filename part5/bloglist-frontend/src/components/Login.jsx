import { useState } from 'react';

import PropTypes  from 'prop-types';

import loginService from '../services/loginService'
import Notification from './Notification';

const Login = ({ setUser }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');   

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

    try {
      const user = await loginService.login({
        username, 
        password
      })

      setUser(user);

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUsername('');
      setPassword('');

      setErrorMessage('Login succesful');
      setErrorType('addition')

      setTimeout(() => {
        setErrorMessage(null);
        setErrorType(null);
      }, 3000);

    } catch(e) {

      setErrorMessage('Wrong Credential');
      setErrorType('error')

      setTimeout(() => {
        setErrorMessage(null);
        setErrorType(null);
      }, 3000);
    }
  }

  return(
    <div>
      <h2>Log in to application</h2>
      <Notification message={ errorMessage } type={ errorType } />
      <form onSubmit={ handleSubmit }>
        <div style={ styleInput }>
          <label>Username:</label>
          <input type="text" className="username" id="username" value={ username } onChange={ ({ target }) => setUsername(target.value) } />
        </div>

        <div style={ styleInput }>
          <label>Password:</label>
          <input type="password" className="password" id="password" value={ password } onChange={ ({ target }) => setPassword(target.value) } />
        </div>
        
        <button type="submit">login</button>
      </form>
    </div>
  )
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Login;