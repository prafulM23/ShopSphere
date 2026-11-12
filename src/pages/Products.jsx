
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Search, SlidersHorizontal } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function Products() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const { addToCart } = useCart()
    const { isWishlisted, toggleWishlist } = useWishlist()

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [sort, setSort] = useState('newest')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [actionMessage, setActionMessage] = useState('')
    const [actionLoading, setActionLoading] = useState('')

    // Load all products and build category options from database data.
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/products')
                const result = response.data
                const list =
                    result.data?.products ??
                    result.products ??
                    result.data ??
                    []

                const uniqueCategories = [
                    ...new Set(
                        list
                            .map((product) =>
                                typeof product.category === 'object'
                                    ? product.category?.name
                                    : product.category
                            )
                            .filter(Boolean)
                    ),
                ]

                setCategories(uniqueCategories)
            } catch {
                // The main product request will show the error.
            }
        }

        fetchCategories()
    }, [])

    // Search and category filtering use the existing backend API.
    useEffect(() => {
        let ignore = false

        const fetchProducts = async () => {
            setLoading(true)
            setError('')

            try {
                const params = {}

                if (search.trim()) params.search = search.trim()
                if (category !== 'all') params.category = category

                const response = await api.get('/products', { params })
                const result = response.data
                const list =
                    result.data?.products ??
                    result.products ??
                    result.data ??
                    []

                if (!ignore) setProducts(Array.isArray(list) ? list : [])
            } catch (err) {
                if (!ignore) {
                    setError(
                        err.response?.data?.message || 'Unable to load products.'
                    )
                }
            } finally {
                if (!ignore) setLoading(false)
            }
        }

        const timer = setTimeout(fetchProducts, 300)

        return () => {
            ignore = true
            clearTimeout(timer)
        }
    }, [search, category])

    const sortedProducts = useMemo(() => {
        const list = [...products]

        if (sort === 'price-low') {
            list.sort((a, b) => Number(a.price) - Number(b.price))
        } else if (sort === 'price-high') {
            list.sort((a, b) => Number(b.price) - Number(a.price))
        }

        return list
    }, [products, sort])

    const getImage = (product) =>
        product.imageUrl ||
        product.imageURL ||
        product.image ||
        product.images?.[0] ||
        ''

    const getCategory = (product) =>
        typeof product.category === 'object'
            ? product.category?.name
            : product.category

    const handleCart = async (product) => {
        if (!isAuthenticated) {
            navigate('/login', {
                state: { from: `/products/${product.id}` },
            })
            return
        }

        try {
            setActionLoading(`cart-${product.id}`)
            await addToCart(product, 1)
            setActionMessage('Product added to your bag.')
        } catch (err) {
            setActionMessage(
                err.response?.data?.message || 'Could not add product to bag.'
            )
        } finally {
            setActionLoading('')
        }
    }

    const handleWishlist = async (product) => {
        if (!isAuthenticated) {
            navigate('/login', {
                state: { from: '/products' },
            })
            return
        }

        try {
            setActionLoading(`wishlist-${product.id}`)
            await toggleWishlist(product.id)
            setActionMessage(
                isWishlisted(product.id)
                    ? 'Removed from wishlist.'
                    : 'Added to wishlist.'
            )
        } catch (err) {
            setActionMessage(
                err.response?.data?.message || 'Wishlist action failed.'
            )
        } finally {
            setActionLoading('')
        }
    }

    return (
        <main className="min-h-screen bg-[#f5f0e8] text-stone-900">
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-10 border-b border-stone-300 pb-8">
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#a58a52]">
                        The ShopSphere Collection
                    </p>

                    <h1 className="font-serif text-4xl sm:text-5xl">
                        All Products
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
                        Explore our complete collection of carefully selected products.
                    </p>
                </div>

                {/* Search and filters */}
                <div className="mb-8 grid gap-4 md:grid-cols-[1fr_220px_220px]">
                    <div className="flex items-center gap-3 border border-stone-300 bg-white px-4 py-3">
                        <Search size={18} className="text-stone-500" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3 border border-stone-300 bg-white px-4 py-3">
                        <SlidersHorizontal size={17} className="text-stone-500" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-stone-300 bg-white px-4 py-3 text-sm outline-none"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-stone-600">
                        {loading ? 'Loading products...' : `${sortedProducts.length} Products`}
                    </p>

                    <button
                        onClick={() => {
                            setSearch('')
                            setCategory('all')
                            setSort('newest')
                        }}
                        className="text-xs uppercase tracking-widest text-[#9b7b3d] underline underline-offset-4"
                    >
                        Clear Filters
                    </button>
                </div>

                {actionMessage && (
                    <p className="mb-5 text-sm text-[#92743d]" role="status">
                        {actionMessage}
                    </p>
                )}

                {error && (
                    <div className="py-16 text-center">
                        <p className="text-red-700">{error}</p>
                        <button
                            onClick={() => {
                                setSearch((value) => value)
                            }}
                            className="mt-4 text-sm underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="py-24 text-center text-sm text-stone-500">
                        Loading collection...
                    </div>
                ) : !error && sortedProducts.length === 0 ? (
                    <div className="py-24 text-center">
                        <h2 className="font-serif text-2xl">No products found</h2>
                        <p className="mt-2 text-sm text-stone-500">
                            Try another search or category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
                        {sortedProducts.map((product) => (
                            <article key={product.id} className="group">
                                <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e2d7]">
                                    <Link to={`/products/${product.id}`}>
                                        {getImage(product) ? (
                                            <img
                                                src={getImage(product)}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-stone-500">
                                                No image available
                                            </div>
                                        )}
                                    </Link>

                                    <button
                                        onClick={() => handleWishlist(product)}
                                        disabled={actionLoading === `wishlist-${product.id}`}
                                        aria-label="Toggle wishlist"
                                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
                                    >
                                        <Heart
                                            size={18}
                                            fill={isWishlisted(product.id) ? '#a58a52' : 'none'}
                                            color={isWishlisted(product.id) ? '#a58a52' : '#292524'}
                                        />
                                    </button>
                                </div>

                                <div className="pt-4">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#a58a52]">
                                        {getCategory(product) || 'Collection'}
                                    </p>

                                    <Link to={`/products/${product.id}`}>
                                        <h2 className="mt-2 line-clamp-1 font-serif text-lg">
                                            {product.name}
                                        </h2>
                                    </Link>

                                    <p className="mt-2 text-sm font-medium">
                                        ₹{Number(product.price).toLocaleString('en-IN')}
                                    </p>

                                    <button
                                        onClick={() => handleCart(product)}
                                        disabled={actionLoading === `cart-${product.id}`}
                                        className="mt-4 flex w-full items-center justify-center gap-2 bg-stone-900 px-3 py-3 text-[10px] uppercase tracking-[0.15em] text-white transition hover:bg-[#a58a52] disabled:opacity-50"
                                    >
                                        <ShoppingBag size={15} />
                                        {actionLoading === `cart-${product.id}`
                                            ? 'Adding...'
                                            : 'Add to Bag'}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Products
