import { useContext, useEffect, useRef } from 'react'
import UserContext from '../context/UserContext'

function Navbar() {
  const { setSearchTerm, showAll, setShowAll, theme, toggleTheme } = useContext(UserContext)
  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  const handleLiveSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.trim() !== '') {
      setShowAll(false)
    } else {
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
    setShowAll(true)
    searchRef.current.focus()
  }

  const handleShowAll = () => {
    setShowAll(!showAll)
    if (!showAll) {
      // FIX: tambah pengecekan agar tidak error jika ref belum siap
      if (searchRef.current) searchRef.current.value = ''
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
          onChange={handleLiveSearch}
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

        {/* Tombol Toggle Tema */}
        <button type="button" className="secondary" onClick={toggleTheme} style={{ borderRadius: '50%', padding: '10px 14px' }}>
          {theme === 'light' ? '🌙' : '🌞'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
