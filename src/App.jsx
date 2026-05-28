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
  const { searchTerm, showAll } = useContext(UserContext)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json()
        
        // --- TAMBAHKAN DELAY BUATAN DI SINI ---
        // Kita tahan datanya selama 2 detik (2000 milidetik) baru ditampilkan
        setTimeout(() => {
          setUsers(data)
          setLoading(false)
        }, 1000)

      } catch (err) {
        setError('Gagal mengambil data user. Silakan coba lagi.')
        setLoading(false)
      }
    }

    loadUsers()
  }, [])
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
            ? 'Menampilkan semua data user'
            : searchTerm
            ? `Pencarian: "${searchTerm}"` 
            : 'Data User diambil dari API https://jsonplaceholder.typicode.com/users'}
        </p>
        <p>
          {loading
            ? 'Memuat data...'
            : error || (showAll ? `Total ${filteredUsers.length} user.` : (searchTerm.trim() ? `${filteredUsers.length} user ditemukan.` : 'Klik tombol "Tampilkan Semua Data" atau masukkan kata kunci untuk mencari user.'))}
        </p>
      </section>

      {error && <div className="error-banner">{error}</div>}

      <section className="user-grid">
        {loading ? (
          /* Render 6 skeleton cards saat data masih di-fetch */
          <>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </>
        ) : showAll || searchTerm.trim() !== '' ? (
          filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <NotFound searchTerm={searchTerm} />
          )
        ) : (
          <div className="empty-state">Klik tombol "Tampilkan Semua Data" atau masukkan kata kunci untuk mencari user.</div>
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
import SkeletonCard from './components/SkeletonCard'
export default App
import NotFound from './components/NotFound'