import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ArticleListPage from './pages/ArticleListPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import AddArticlePage from './pages/AddArticlePage'

const styles = {
  nav: {
    background: '#1e293b',
    padding: '1rem 2rem',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navBrand: { color: '#fff', fontWeight: 700, fontSize: '1.2rem' },
  navLink: { color: '#94a3b8' },
  main: { maxWidth: 800, margin: '2rem auto', padding: '0 1rem' },
}

export default function App() {
  return (
    <>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navBrand}>Simple Blog</Link>
        <Link to="/" style={styles.navLink}>Articles</Link>
        <Link to="/add" style={styles.navLink}>+ New Article</Link>
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<ArticleListPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/add" element={<AddArticlePage />} />
        </Routes>
      </main>
    </>
  )
}
