import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import Home from '../pages/Home'
import Chat from '../pages/Chat'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/chat" /> : <Home onLogin={handleLogin} />
        } />
        <Route path="/chat" element={
          isLoggedIn ? <Chat onLogout={handleLogout} /> : <Navigate to="/" />
        } />
      </Routes>
    </>
  )
}

export default App
