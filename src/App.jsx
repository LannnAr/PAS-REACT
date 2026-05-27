import { useContext, useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import UserCard from './components/UserCard'
import UserContext from './context/UserContext'
import UserProvider from './context/UserProvider'

function AppContent() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { searchTerm } = useContext(UserContext)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError('Gagal mengambil data user. Silakan coba lagi.')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.trim().toLowerCase()
    return (
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  })

  return (
    <div className="app-shell">
      <Navbar />
      <section className="summary">
        <p>
          {searchTerm
            ? `Pencarian: "${searchTerm}"` 
            : 'Data User diambil dari API https://jsonplaceholder.typicode.com/users'}
        </p>
        <p>
          {loading
            ? 'Memuat data...'
            : error || (searchTerm.trim() ? `${filteredUsers.length} user ditemukan.` : 'Masukkan kata kunci untuk mencari user.')}
        </p>
      </section>

      {error && <div className="error-banner">{error}</div>}

      <section className="user-grid">
        {loading ? (
          <div className="empty-state">Sedang memuat data...</div>
        ) : searchTerm.trim() === '' ? (
          <div className="empty-state">Silakan masukkan kata kunci dan tekan Search untuk menampilkan user.</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="empty-state">Tidak ada user yang cocok.</div>
        )}
      </section>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App
