
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const Wishlist = () => {
    const {
        wishlistItems,
        wishlistLoading,
        wishlistError,
        removeFromWishlist,
    } = useWishlist()

    const { addToCart } = useCart()
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [removingId, setRemovingId] = useState(null)
    const [addingId, setAddingId] = useState(null)
    const [message, setMessage] = useState('')

    const handleRemove = async (productId) => {
        setRemovingId(productId)
        setMessage('')

        try {
            await removeFromWishlist(productId)
            setMessage('Product removed from wishlist.')
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Could not remove product.'
            )
        } finally {
            setRemovingId(null)
        }
    }

    const handleAddToCart = async (product) => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        setAddingId(product.id)
        setMessage('')

        try {
            await addToCart(product, 1)
            setMessage(`${product.name} added to your bag.`)
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Could not add product to bag.'
            )
        } finally {
            setAddingId(null)
        }
    }

    return (
        <main className="min-h-screen bg-[#F7F3EC] px-5 py-16 lg:px-10">
            <div className="mx-auto max-w-7xl">

                <div className="mb-12 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#9A7747]">
                        Your personal collection
                    </p>

                    <h1 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">
                        My Wishlist
                    </h1>

                    <p className="mt-3 text-sm text-stone-500">
                        The pieces you've chosen to keep close.
                    </p>
                </div>

                {message && (
                    <p role="status" className="mb-6 text-center text-sm text-[#9A7747]">
                        {message}
                    </p>
                )}

                {wishlistLoading ? (
                    <p className="py-20 text-center text-stone-500">
                        Loading your wishlist...
                    </p>
                ) : wishlistError && wishlistItems.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-red-600">{wishlistError}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 bg-stone-900 px-6 py-3 text-sm text-white"
                        >
                            Try Again
                        </button>
                    </div>
                ) : wishlistItems.length === 0 ? (
                    <div className="mx-auto max-w-lg py-16 text-center">
                        <Heart
                            size={42}
                            strokeWidth={1}
                            className="mx-auto text-[#9A7747]"
                        />

                        <h2 className="mt-6 font-serif text-3xl text-stone-900">
                            Your wishlist is empty
                        </h2>

                        <p className="mt-3 text-sm text-stone-500">
                            Discover something special and save your favourite pieces here.
                        </p>

                        <Link
                            to="/"
                            className="mt-8 inline-flex items-center gap-2 bg-stone-900 px-7 py-4 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#9A7747]"
                        >
                            Explore Collection
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex items-center justify-between border-b border-stone-300 pb-4">
                            <p className="text-sm text-stone-600">
                                {wishlistItems.length} saved {wishlistItems.length === 1 ? 'piece' : 'pieces'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
                            {wishlistItems.map((item) => {
                                const product = item.product

                                if (!product) return null

                                const image =
                                    product.imageUrl ??
                                    product.imageURL ??
                                    product.image ??
                                    ''

                                return (
                                    <article key={item.id} className="group">
                                        <div className="relative overflow-hidden bg-[#EEE8DE]">
                                            <Link to={`/products/${product.id}`}>
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={product.name}
                                                        loading="lazy"
                                                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-80"
                                                    />
                                                ) : (
                                                    <div className="flex h-56 items-center justify-center text-sm text-stone-400 sm:h-80">
                                                        No image available
                                                    </div>
                                                )}
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => handleRemove(product.id)}
                                                disabled={removingId === product.id}
                                                aria-label={`Remove ${product.name} from wishlist`}
                                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-600 disabled:opacity-50"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleAddToCart(product)}
                                                disabled={addingId === product.id}
                                                className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-stone-900 py-3 text-xs font-medium text-white transition hover:bg-[#A58150] disabled:opacity-60"
                                            >
                                                <ShoppingBag size={15} />
                                                {addingId === product.id ? 'Adding...' : 'Add to Bag'}
                                            </button>
                                        </div>

                                        <div className="pt-4">
                                            <Link to={`/products/${product.id}`}>
                                                <p className="text-[10px] tracking-[0.16em] text-stone-500">
                                                    {typeof product.category === 'string'
                                                        ? product.category
                                                        : product.category?.name ?? 'COLLECTION'}
                                                </p>

                                                <h3 className="mt-2 font-serif text-lg text-stone-900 hover:text-[#9A7747]">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <p className="mt-2 text-sm font-medium text-stone-900">
                                                ₹{Number(product.price ?? 0).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}

export default Wishlist
