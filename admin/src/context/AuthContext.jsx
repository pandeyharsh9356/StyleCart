import React, { createContext } from 'react'

export const authDataContext = createContext()
function AuthContext({ children }) {
  // backend server (matches backend/.env PORT=8000)
  let serverUrl = ""

  let value = {
    serverUrl
  }
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>

    </div>
  )
}

export default AuthContext
