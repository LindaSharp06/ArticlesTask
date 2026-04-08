import React from 'react'

const styles = {
  item: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
  },
  author: { fontWeight: 600, marginBottom: '0.2rem' },
  date: { fontSize: '0.75rem', color: '#888', marginBottom: '0.3rem' },
  content: { color: '#444', lineHeight: 1.6 },
}

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p style={{ color: '#888' }}>No comments yet. Be the first!</p>
  }

  return (
    <div>
      {comments.map((c) => (
        <div key={c.id} style={styles.item}>
          <div style={styles.author}>{c.author_name}</div>
          <div style={styles.date}>{new Date(c.created_at).toLocaleDateString()}</div>
          <div style={styles.content}>{c.content}</div>
        </div>
      ))}
    </div>
  )
}
