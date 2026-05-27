import { useContext, useEffect, useRef } from 'react'
import UserContext from '../context/UserContext'

function Navbar() {
  const { setSearchTerm } = useContext(UserContext)
  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  const handleSearch = () => {
    const value = searchRef.current?.value.trim() ?? ''
    setSearchTerm(value)
  }

  const handleClear = () => {
    if (!searchRef.current) return
    searchRef.current.value = ''
    setSearchTerm('')
    searchRef.current.focus()
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
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className="secondary" onClick={handleClear}>
          Clear
        </button>
      </div>
    </header>
  )
}

export default Navbar
