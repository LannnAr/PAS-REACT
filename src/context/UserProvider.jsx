import { useState, useEffect } from 'react'
import UserContext from './UserContext'

function UserProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  // Ambil tema terakhir yang disimpan di browser, default-nya light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
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