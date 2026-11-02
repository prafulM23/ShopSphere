
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import api from '../services/api'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
    const { token, isAuthenticated } = useAuth()

    const [wishlistItems, setWishlistItems] = useState([])
    const [wishlistLoading, setWishlistLoading] = useState(false)
    const [wishlistError, setWishlistError] = useState('')

    // Fetch wishlist from backend
    const fetchWishlist = async () => {
        if (!token) {
            setWishlistItems([])
            return
        }

        setWishlistLoading(true)
        setWishlistError('')

        try {
            const response = await api.get('/wishlist')

            const items = response.data.data.items ?? []

            setWishlistItems(items)
        } catch (error) {
            setWishlistError(
                error.response?.data?.message ||
                'Failed to fetch wishlist'
            )
            throw error
        } finally {
            setWishlistLoading(false)
        }
    }

    // Sync wishlist whenever authentication changes
    useEffect(() => {
        if (isAuthenticated && token) {
            fetchWishlist().catch(() => { })
        } else {
            setWishlistItems([])
            setWishlistError('')
        }
    }, [token, isAuthenticated])

    // Check whether product exists in wishlist
    const isWishlisted = (productId) => {
        return wishlistItems.some(
            (item) => item.product?.id === productId
        )
    }

    // Add product to wishlist
    const addToWishlist = async (productId) => {
        try {
            setWishlistError('')

            const response = await api.post('/wishlist', {
                productId,
            })

            const newItem = response.data.data

            setWishlistItems((prevItems) => {
                const alreadyExists = prevItems.some(
                    (item) => item.product?.id === productId
                )

                return alreadyExists
                    ? prevItems
                    : [newItem, ...prevItems]
            })

            return response.data
        } catch (error) {
            setWishlistError(
                error.response?.data?.message ||
                'Failed to add product to wishlist'
            )
            throw error
        }
    }

    // Remove product from wishlist
    const removeFromWishlist = async (productId) => {
        const wishlistItem = wishlistItems.find(
            (item) => item.product?.id === productId
        )

        if (!wishlistItem) return

        try {
            setWishlistError('')

            await api.delete(`/wishlist/${wishlistItem.id}`)

            setWishlistItems((prevItems) =>
                prevItems.filter(
                    (item) => item.id !== wishlistItem.id
                )
            )
        } catch (error) {
            setWishlistError(
                error.response?.data?.message ||
                'Failed to remove product from wishlist'
            )
            throw error
        }
    }

    const toggleWishlist = async (productId) => {
        if (isWishlisted(productId)) {
            await removeFromWishlist(productId)
        } else {
            await addToWishlist(productId)
        }
    }

    const wishlistCount = wishlistItems.length

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                wishlistCount,
                wishlistLoading,
                wishlistError,
                fetchWishlist,
                isWishlisted,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => {
    const context = useContext(WishlistContext)

    if (!context) {
        throw new Error(
            'useWishlist must be used inside WishlistProvider'
        )
    }

    return context
}
