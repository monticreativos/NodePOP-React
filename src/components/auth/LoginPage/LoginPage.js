import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import FormField from '../../common/FormField';
import { login } from '../service';
import T from 'prop-types';

import './LoginPage.css';

function useRenders() {
  const count = useRef(1);

  useEffect(() => {
    count.current++;
  });
  return count.current;
}

function LoginPage({ onLogin }) {
  const renders = useRenders();
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(ref.current);
    ref.current.focus();
  }, []);

  const { email, password, remember } = credentials;

  const handleChange = useCallback(event => {
    setCredentials(credentials => ({
      ...credentials,
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
      await login(credentials);
      setIsLoading(false);
      onLogin();
      const from = location.state?.from?.pathname || '/adverts';
      navigate(from, { replace: true });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const buttonDisabled = useMemo(() => {
    console.log('calculando...');
    return !email || !password || isLoading;
  }, [email, password, isLoading]);

  return (
    <div className="loginPage">
  
      <h1 className="loginPage-title">Log in to NodePOP</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="phone, email or username"
          className="loginForm-field"
          value={email}
          onChange={handleChange}
          // ref={ref}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          value={password}
          onChange={handleChange}
          ref={ref}
        />
        <label >Recuerdame</label>
        <input
          type="checkbox"
          name="remember"
          checked={remember}
          value="remember"
          onChange={handleChange}
          id="remember"
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

      <div className="link-login">
      <h5 className="mt-5 text-center">If you are not registered yet </h5>
      <NavLink
          to="/signup"
          className="signup-button"
          style={({ isActive }) => (isActive ? { color: 'green' } : null)}
        >
          signup
        </NavLink>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func,
};

export default LoginPage;
