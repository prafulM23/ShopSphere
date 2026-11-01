
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import api from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const { token, isAuthenticated } = useAuth()

    const [cartItems, setCartItems] = useState([])
    const [cartLoading, setCartLoading] = useState(false)
    const [cartError, setCartError] = useState(null)

    // Fetch logged-in user's cart from backend
    const fetchCart = async () => {
        if (!token) {
            setCartItems([])
            return
        }

        setCartLoading(true)
        setCartError(null)

        try {
            const response = await api.get('/cart')

            const cart = response.data.data.cart

            setCartItems(cart?.items ?? [])
        } catch (error) {
            setCartError(
                error.response?.data?.message || 'Failed to fetch cart'
            )
            throw error
        } finally {
            setCartLoading(false)
        }
    }

    // Fetch cart whenever authentication changes
    useEffect(() => {
        if (isAuthenticated && token) {
            fetchCart().catch(() => { })
        } else {
            setCartItems([])
            setCartError(null)
        }
    }, [token, isAuthenticated])

    // Add product to backend cart
    const addToCart = async (product, quantity = 1) => {
        try {
            setCartError(null)

            await api.post('/cart', {
                productId: product.id,
                quantity,
            })

            await fetchCart()
        } catch (error) {
            setCartError(
                error.response?.data?.message || 'Failed to add product'
            )
            throw error
        }
    }

    // Remove cart item
    const removeFromCart = async (itemId) => {
        try {
            setCartError(null)

            await api.delete(`/cart/${itemId}`)

            setCartItems((prevItems) =>
                prevItems.filter((item) => item.id !== itemId)
            )
        } catch (error) {
            setCartError(
                error.response?.data?.message || 'Failed to remove item'
            )
            throw error
        }
    }

    // Update cart item quantity
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return

        try {
            setCartError(null)

            const response = await api.patch(`/cart/${itemId}`, {
                quantity,
            })

            const updatedItem = response.data.data.cartItem

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === itemId ? updatedItem : item
                )
            )
        } catch (error) {
            setCartError(
                error.response?.data?.message || 'Failed to update quantity'
            )
            throw error
        }
    }

    // Clear entire cart
    const clearCart = async () => {
        try {
            setCartError(null)

            await api.delete('/cart')

            setCartItems([])
        } catch (error) {
            setCartError(
                error.response?.data?.message || 'Failed to clear cart'
            )
            throw error
        }
    }

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.product?.price ?? 0) * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                cartLoading,
                cartError,
                fetchCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used inside CartProvider')
    }

    return context
}
