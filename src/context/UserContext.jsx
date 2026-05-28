import { createContext } from 'react'

const UserContext = createContext({
  searchTerm: '',
  setSearchTerm: () => {},
  showAll: false,
  setShowAll: () => {},
})

export default UserContext
