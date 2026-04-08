import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getArticles } from '../api/client'

const styles = {
  card: {
    background: '#fff',
    borderRadius: 8,
    padding: '1.25rem 1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  title: { fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.25rem' },
  date: { fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' },
  summary: { color: '#444', lineHeight: 1.6 },
}

function truncate(text, max = 150) {
  return text.length > max ? text.slice(0, max) + '…' : text
}

export default function ArticleListPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArticles()
      .then((res) => setArticles(res.data.data))
      .catch(() => setError('Failed to load articles.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} style={styles.card}>
          <div style={styles.title}>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </div>
          <div style={styles.date}>
            {new Date(article.created_at).toLocaleDateString()}
          </div>
          <div style={styles.summary}>{truncate(article.content)}</div>
        </div>
      ))}
    </div>
  )
}
