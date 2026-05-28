import { useState } from 'react'
import UserContext from './UserContext'

function UserProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(true)

  return (
    <UserContext.Provider value={{ searchTerm, setSearchTerm, showAll, setShowAll }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
