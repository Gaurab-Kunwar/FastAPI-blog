import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="status">Loading posts...</div>
  if (error) return <div className="status error">Error: {error}</div>

  return (
    <main className="feed">
      {posts.length === 0 && (
        <div className="empty">No posts yet. Write something!</div>
      )}
      {posts.map(post => (
        <article
          className="card"
          key={post.id}
          onClick={() => navigate(`/posts/${post.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <h2 className="card-title">{post.title}</h2>
          <p className="card-content">{post.content}</p>
          <div className="card-meta">
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </article>
      ))}
    </main>
  )
}

export default Home