import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    setSubmitting(true)
    setError('')

    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,   // ← JWT token here
        },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Failed to create post')
      }

      const post = await res.json()
      navigate(`/posts/${post.id}`)   // go straight to the new post
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h2 className="card-title">New Post</h2>
      {error && <p style={{ color: '#e74c3c', margin: '1rem 0' }}>{error}</p>}
      <div className="login-form">
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Write something..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          style={{ resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
        />
        <button
          className="btn"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </div>
    </div>
  )
}

export default CreatePost