
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import api from '../services/api'

const ProductDetails = () => {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                setError('')

                const response = await api.get(`/products/${id}`)

                const result = response.data
                const productData =
                    result.product ??
                    result.data?.product ??
                    result.data

                if (!productData || typeof productData !== 'object') {
                    throw new Error('Invalid product response')
                }

                setProduct(productData)
            } catch (err) {
                console.error('Product details error:', err)
                setError('Product details load nahi ho paayi.')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F5F0E8]">
                <p className="text-stone-500">Loading product...</p>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F0E8]">
                <p className="text-stone-600">
                    {error || 'Product not found.'}
                </p>
                <Link to="/" className="text-sm underline">
                    Back to Home
                </Link>
            </div>
        )
    }

    const image =
        product.imageUrl ??
        product.imageURL ??
        product.image ??
        (Array.isArray(product.images)
            ? product.images[0]?.imageUrl ??
            product.images[0]?.url ??
            product.images[0]
            : '')

    const category =
        typeof product.category === 'string'
            ? product.category
            : product.category?.name ?? 'COLLECTION'

    return (
        <main className="min-h-screen bg-[#F5F0E8] px-5 py-10 lg:px-10">
            <div className="mx-auto max-w-7xl">

                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-stone-600 transition hover:text-[#9A7747]"
                >
                    <ArrowLeft size={16} />
                    Back to Collection
                </Link>

                <div className="grid gap-10 md:grid-cols-2 lg:gap-16">

                    <div className="bg-[#EAE4DA]">
                        {image ? (
                            <img
                                src={image}
                                alt={product.name}
                                className="h-[450px] w-full object-cover sm:h-[600px]"
                            />
                        ) : (
                            <div className="flex h-[450px] items-center justify-center text-stone-400">
                                No image available
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center py-4">

                        <p className="text-xs uppercase tracking-[0.22em] text-[#9A7747]">
                            {category}
                        </p>

                        <h1 className="mt-4 font-serif text-4xl text-stone-900 sm:text-5xl">
                            {product.name}
                        </h1>

                        <p className="mt-5 text-2xl font-medium text-stone-900">
                            ₹{Number(product.price ?? 0).toLocaleString('en-IN')}
                        </p>

                        <div className="my-8 border-t border-stone-300" />

                        <h2 className="font-serif text-xl text-stone-900">
                            Product Description
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-stone-600">
                            {product.description || 'No description available for this product.'}
                        </p>

                        <div className="my-8 border-t border-stone-300" />

                        <p className="mb-3 text-sm font-medium text-stone-800">
                            Quantity
                        </p>

                        <div className="flex w-fit items-center border border-stone-400">
                            <button
                                type="button"
                                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                className="p-3 transition hover:bg-stone-200"
                                aria-label="Decrease quantity"
                            >
                                <Minus size={15} />
                            </button>

                            <span className="min-w-12 text-center text-sm">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={() => setQuantity((prev) => prev + 1)}
                                className="p-3 transition hover:bg-stone-200"
                                aria-label="Increase quantity"
                            >
                                <Plus size={15} />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => addToCart(product, quantity)}
                            className="mt-7 flex w-full items-center justify-center gap-3 bg-stone-900 px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#9A7747]"
                        >
                            <ShoppingBag size={17} />
                            Add to Bag
                        </button>

                        <p className="mt-4 text-xs text-stone-500">
                            Quantity selected: {quantity}
                        </p>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductDetails
