import { useState } from 'react'
import UserContext from './UserContext'

function UserProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <UserContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
