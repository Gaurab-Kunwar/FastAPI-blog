import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import './App.css'

function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  return (
    <header className="header">
      <div>
        <h1 className="logo" onClick={() => navigate('/')}>BLOG</h1>
        <p className="tagline">thoughts, projects & midnight code</p>
      </div>
      <div className="header-actions">
        {isLoggedIn ? (
          <>
            <button className="btn" onClick={() => navigate('/create')}>+ New Post</button>
            <button className="btn btn-danger" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="btn" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </header>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App