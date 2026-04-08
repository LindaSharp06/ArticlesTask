import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticle } from '../api/client'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'

const styles = {
  back: { display: 'inline-block', marginBottom: '1rem', color: '#2563eb' },
  card: { background: '#fff', borderRadius: 8, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  title: { fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem' },
  date: { fontSize: '0.8rem', color: '#888', marginBottom: '1rem' },
  content: { lineHeight: 1.8, color: '#333', marginBottom: '2rem' },
  section: { fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.4rem' },
}

export default function ArticleDetailPage() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArticle(id)
      .then((res) => setArticle(res.data.data))
      .catch(() => setError('Article not found.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleCommentAdded = (comment) => {
    setArticle((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), comment],
    }))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <Link to="/" style={styles.back}>← Back to articles</Link>
      <div style={styles.card}>
        <h1 style={styles.title}>{article.title}</h1>
        <div style={styles.date}>{new Date(article.created_at).toLocaleDateString()}</div>
        <p style={styles.content}>{article.content}</p>

        <div style={styles.section}>Comments ({article.comments?.length ?? 0})</div>
        <CommentList comments={article.comments} />

        <div style={{ marginTop: '1.5rem' }}>
          <div style={styles.section}>Leave a Comment</div>
          <CommentForm articleId={article.id} onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  )
}
