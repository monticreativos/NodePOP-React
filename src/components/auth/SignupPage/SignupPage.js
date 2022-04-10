import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import { createUser, login } from '../service';
import T from 'prop-types';

import './SignupPage.css';

// function useRenders() {
//   const count = useRef(1);

//   useEffect(() => {
//     count.current++;
//   });
//   return count.current;
// }

function SignupPage() {
//   const renders = useRenders();
//   const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const { email, password, name, username } = user;

  const handleChange = useCallback(event => {
    setUser(users => ({
      ...users,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  }, []);

  const resetError = () => setError(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      resetError();
      setIsLoading(true);
      console.log(user)
      await createUser(user);
      setIsLoading(false);
      const from = location.state?.from?.pathname || '/adverts';
      navigate('/adverts', { replace: true });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const navigateBack = () => {
    const from = location.state?.from?.pathname || '/';
      navigate('/', { replace: true });
  }

  const buttonDisabled = useMemo(() => {
    console.log('calculando...');
    return !email || !password || !username || !name || isLoading;
  }, [email, password, username, name, isLoading]);

  return (
    <div className="loginPage">
      {/* {renders} */}
      <h1 className="loginPage-title">Signup to NodePOP</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">Correo Electronico</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={handleChange}
        />
          <label className="form-label" htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="username">Nombre de Usuario</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control"
          value={username}
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={handleChange}
        />
        
        <Button
          className="loginForm-submit"
          type="submit"
          variant="primary"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
      <NavLink
          to="/signup"
          className="signup-button"
          style={({ isActive }) => (isActive ? { color: 'white' } : null)}
          onClick={navigateBack()}
        >
          Return
        </NavLink>
    </div>
  );
}


export default SignupPage;
