import { createContext } from 'react'

const UserContext = createContext({
  searchTerm: '',
  setSearchTerm: () => {},
  showAll: false,
  setShowAll: () => {},
  theme: 'light',      // Tambahan baru
  toggleTheme: () => {} // Tambahan baru
})

export default UserContext