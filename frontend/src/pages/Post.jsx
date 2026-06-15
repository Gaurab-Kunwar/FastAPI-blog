import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Post() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8000/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found')
        return res.json()
      })
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="status">Loading...</div>
  if (error) return <div className="status error">{error}</div>

  return (
    <article className="card single-post">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h1 className="card-title">{post.title}</h1>
      <div className="card-meta" style={{ marginBottom: '1.5rem' }}>
        {new Date(post.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </div>
      <p className="card-content">{post.content}</p>
    </article>
  )
}

export default Post