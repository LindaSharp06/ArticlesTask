import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '../api/client'

const styles = {
  card: { background: '#fff', borderRadius: 8, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  title: { fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  label: { fontWeight: 500, marginBottom: '0.2rem', display: 'block' },
  input: { width: '100%', padding: '0.5rem 0.75rem', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem' },
  textarea: { width: '100%', padding: '0.5rem 0.75rem', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem', minHeight: 160, resize: 'vertical' },
  btn: { alignSelf: 'flex-start', padding: '0.5rem 1.25rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '1rem' },
  error: { color: 'red', fontSize: '0.875rem' },
}

export default function AddArticlePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await createArticle(form)
      navigate(`/articles/${res.data.data.id}`)
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create article.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.title}>New Article</div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label style={styles.label} htmlFor="title">Title</label>
          <input
            id="title"
            style={styles.input}
            name="title"
            placeholder="Article title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="content">Content</label>
          <textarea
            id="content"
            style={styles.textarea}
            name="content"
            placeholder="Write your article..."
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        {error && <span style={styles.error}>{error}</span>}
        <button style={styles.btn} type="submit" disabled={submitting}>
          {submitting ? 'Publishing...' : 'Publish Article'}
        </button>
      </form>
    </div>
  )
}
