import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append('username', username)
    form.append('password', password)

    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: form,
      })

      if (!res.ok) throw new Error('Invalid credentials')

      const data = await res.json()
      localStorage.setItem('token', data.access_token)
      onLogin()        // ← tell App we're logged in
      navigate('/')    // ← go home
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 className="card-title">Login</h2>
      {error && <p style={{ color: '#e74c3c', marginBottom: '1rem' }}>{error}</p>}
      <div className="login-form">
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login