import { useContext, useEffect, useRef } from 'react'
import UserContext from '../context/UserContext'

function Navbar() {
  const { setSearchTerm, showAll, setShowAll } = useContext(UserContext)
  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  // 1. TAMBAHAN BARU: Fungsi untuk menangani ketikan secara langsung (Real-time)
  const handleLiveSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value) // Langsung simpan huruf yang diketik ke state pencarian
    
    // Jika input tidak kosong, matikan mode "Tampilkan Semua" agar filter berjalan
    if (value.trim() !== '') {
      setShowAll(false)
    } else {
      // Jika input dihapus sampai kosong, kembalikan ke mode nampilin semua data
      setShowAll(true) 
    }
  }

  const handleSearch = () => {
    const value = searchRef.current?.value.trim() ?? ''
    setSearchTerm(value)
    setShowAll(false)
  }

  const handleClear = () => {
    if (!searchRef.current) return
    searchRef.current.value = ''
    setSearchTerm('')
    setShowAll(true) // Sesuaikan agar saat clear, balik menampilkan semua data
    searchRef.current.focus()
  }

  const handleShowAll = () => {
    setShowAll(!showAll)
    if (!showAll) {
      searchRef.current.value = ''
      setSearchTerm('')
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <h1>React User Dashboard</h1>
        <p>Gunakan search untuk mencari nama, email, atau username user.</p>
      </div>
      <div className="navbar__search">
        <input
          type="text"
          ref={searchRef}
          placeholder="Search user..."
          aria-label="Search user"
          onChange={handleLiveSearch} /* 2. TAMBAHAN BARU: Panggil fungsi di sini */
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className="secondary" onClick={handleClear}>
          Clear
        </button>
        <button type="button" className={showAll ? 'primary active' : 'primary'} onClick={handleShowAll}>
          {showAll ? 'Sembunyikan' : 'Tampilkan Semua Data'}
        </button>
      </div>
    </header>
  )
}

export default Navbar