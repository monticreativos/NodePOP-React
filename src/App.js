import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/auth/LoginPage/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import NewTweetPage from './components/adverts/NewAdvertsPage/NewAdvertsPage';
import AdvertPage from './components/adverts/AdvertPage/AdvertPage';
import AdvertsPage from './components/adverts/AdvertsPage/AdvertsPage';
import { AuthContextProvider } from './components/auth/context';
import Layout from './components/layout/Layout';
import SignupPage from './components/auth/SignupPage/SignupPage';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <AuthContextProvider value={{ isLogged, handleLogin, handleLogout }}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/adverts" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<AdvertsPage />} />
            <Route path=":id" element={<RequireAuth><AdvertPage tweetId={':id'} /></RequireAuth>} />
            <Route
              path="/adverts/new"
              element={
                <RequireAuth>
                  <NewTweetPage />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/404" element={<div>404 | Not Found Page</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

