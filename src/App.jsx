import { useContext, useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import SkeletonCard from './components/SkeletonCard'
import UserCard from './components/UserCard'
import UserContext from './context/UserContext'
import UserProvider from './context/UserProvider'

function AppContent() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showSkeleton, setShowSkeleton] = useState(false)
  const { searchTerm, showAll } = useContext(UserContext)

  // Fetch data satu kali saat mount
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json()

        setTimeout(() => {
          setUsers(data)
          setLoading(false)
        }, 200)

      } catch (err) {
        setError('Gagal mengambil data user. Silakan coba lagi.')
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Setiap kali showAll berubah jadi true, tampilkan skeleton sebentar
  useEffect(() => {
    if (showAll) {
      setShowSkeleton(true)
      const timer = setTimeout(() => setShowSkeleton(false), 444)
      return () => clearTimeout(timer)
    }
  }, [showAll])

  const filteredUsers = showAll
    ? users
    : users.filter((user) => {
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
          {showAll
            ? `Menampilkan semua user dari JSONPlaceholder API`
            : searchTerm
            ? `Hasil pencarian untuk: "${searchTerm}"`
            : '👋 Selamat datang di React User Dashboard'}
        </p>
        <p>
          {!showAll && searchTerm.trim() === ''
            ? 'Klik "Tampilkan Semua Data" atau ketik nama/email untuk mulai mencari.'
            : loading || showSkeleton
            ? 'Memuat data...'
            : error || (showAll
                ? `Total ${filteredUsers.length} user tersedia.`
                : `${filteredUsers.length} user ditemukan.`)}
        </p>
      </section>

      {error && <div className="error-banner">{error}</div>}

      <section className="user-grid">
        {!showAll && searchTerm.trim() === '' ? (
          
          <div className="empty-state">
            <div style={{ fontSize: '3rem' }}>🔍</div>
            <h3>Mulai Eksplorasi</h3>
            <p>Klik <strong>"Tampilkan Semua Data"</strong> untuk melihat semua user, atau ketik nama / email di kotak pencarian.</p>
          </div>
        ) : loading || showSkeleton ? (
          // Skeleton muncul setiap kali tombol diklik
          <>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))
        ) : (
          <NotFound searchTerm={searchTerm} />
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
