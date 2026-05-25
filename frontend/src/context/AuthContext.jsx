import React from 'react'
import { createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({ children }) {
    const serverUrl = (import.meta.env.VITE_SERVER_URL || 'http://localhost:8000')
        .toString()
        .trim()
        .replace(/(^["']|["']$)/g, '')

    const value = {
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
