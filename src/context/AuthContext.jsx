import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('shopsphere-user')
            return savedUser ? JSON.parse(savedUser) : null
        } catch {
            return null
        }
    })

    const [token, setToken] = useState(
        () => localStorage.getItem('shopsphere-token')
    )

    const [loading, setLoading] = useState(false)

    const signup = async (userData) => {
        const response = await api.post('/auth/signup', userData)
        return response.data
    }

    const login = async (credentials) => {
        setLoading(true)

        try {
            const response = await api.post('/auth/login', credentials)

            const { user: loggedInUser, token: accessToken } =
                response.data.data

            localStorage.setItem('shopsphere-token', accessToken)
            localStorage.setItem(
                'shopsphere-user',
                JSON.stringify(loggedInUser)
            )

            setToken(accessToken)
            setUser(loggedInUser)

            return response.data
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('shopsphere-token')
        localStorage.removeItem('shopsphere-user')

        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: Boolean(token),
                signup,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return context
}