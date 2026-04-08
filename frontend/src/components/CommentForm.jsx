import React, { useState } from 'react'
import { createComment } from '../api/client'

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' },
  input: { padding: '0.5rem 0.75rem', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem' },
  textarea: { padding: '0.5rem 0.75rem', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem', minHeight: 80, resize: 'vertical' },
  btn: { alignSelf: 'flex-start', padding: '0.5rem 1.25rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '1rem' },
  error: { color: 'red', fontSize: '0.875rem' },
}

export default function CommentForm({ articleId, onCommentAdded }) {
  const [form, setForm] = useState({ author_name: '', content: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await createComment(articleId, form)
      onCommentAdded(res.data.data)
      setForm({ author_name: '', content: '' })
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to post comment.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        style={styles.input}
        name="author_name"
        placeholder="Your name"
        value={form.author_name}
        onChange={handleChange}
        required
      />
      <textarea
        style={styles.textarea}
        name="content"
        placeholder="Write a comment..."
        value={form.content}
        onChange={handleChange}
        required
      />
      {error && <span style={styles.error}>{error}</span>}
      <button style={styles.btn} type="submit" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  )
}
