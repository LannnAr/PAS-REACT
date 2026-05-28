import { useState, useEffect } from 'react'
import UserContext from './UserContext'

function UserProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(true)

  // FIX: komentar diperbaiki — default tema adalah 'dark', bukan 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  // Sinkronisasikan tema ke tag HTML dan simpan di localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <UserContext.Provider value={{ searchTerm, setSearchTerm, showAll, setShowAll, theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
