import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import LoginPage from './components/auth/LoginPage/LoginPage'
import RequireAuth from './components/auth/RequireAuth'
import NewTweetPage from './components/adverts/NewAdvertsPage/NewAdvertsPage'
import AdvertPage from './components/adverts/AdvertPage/AdvertPage'
import AdvertsPage from './components/adverts/AdvertsPage/AdvertsPage'
import { AuthContextProvider } from './components/auth/context'
import Layout from './components/layout/Layout'
import SignupPage from './components/auth/SignupPage/SignupPage'

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged)
  const navigate = useNavigate

  const handleLogin = () => {
    setIsLogged(true)
  }

  const handleLogout = () => {
    setIsLogged(false)
  }

  return (
    <div className="App">
      <AuthContextProvider value={{ isLogged, handleLogin, handleLogout }}>
        <Routes>
          <Route
            path="/adverts"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<AdvertsPage />} />
            <Route path="new" element={<NewTweetPage />} />
            <Route
              path=":id"
              element={<AdvertPage tweetId={':id'} navegacion={useNavigate} />}
            />
          </Route>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/404" element={<div>404 | Not Found Page</div>} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
