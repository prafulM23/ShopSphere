
import { useEffect, useState } from 'react'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import api from '../services/api'

const FeaturedProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')

                const result = response.data
                const productList =
                    result.products ??
                    result.data?.products ??
                    result.data ??
                    []

                if (!Array.isArray(productList)) {
                    throw new Error('Unexpected products API response')
                }

                setProducts(productList)
            } catch (err) {
                console.error('Products API error:', err)
                setError('Products load nahi ho paaye. Backend check karo.')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return (
        <section id="products" className="bg-white px-5 py-20 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#9A7747]">
                        Selected for you
                    </p>
                    <h2 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">
                        The considered edit
                    </h2>
                    <p className="mt-3 text-sm text-stone-500">
                        Pieces worth keeping, styles worth returning to.
                    </p>
                </div>

                {loading ? (
                    <p className="py-12 text-center text-stone-500">
                        Loading products...
                    </p>
                ) : error ? (
                    <p className="py-12 text-center text-red-600">{error}</p>
                ) : products.length === 0 ? (
                    <p className="py-12 text-center text-stone-500">
                        Abhi koi product available nahi hai.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">
                        {products.map((product) => {
                            const image =
                                product.imageUrl ??
                                product.imageURL ??
                                product.image ??
                                (Array.isArray(product.images)
                                    ? product.images[0]?.imageUrl ??
                                    product.images[0]?.url ??
                                    product.images[0]
                                    : '')

                            return (
                                <article key={product.id} className="group">
                                    <div className="relative overflow-hidden bg-[#F4F0E9]">
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

                                        <button
                                            type="button"
                                            aria-label={`Add ${product.name} to wishlist`}
                                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
                                        >
                                            <Heart size={17} strokeWidth={1.5} />
                                        </button>

                                        <button
                                            type="button"
                                            className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-stone-900 py-3 text-xs font-medium text-white transition hover:bg-[#A58150]"
                                        >
                                            <ShoppingBag size={15} />
                                            Add to Bag
                                        </button>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-[10px] tracking-[0.16em] text-stone-500">
                                            {typeof product.category === 'string'
                                                ? product.category
                                                : product.category?.name ?? 'COLLECTION'}
                                        </p>

                                        <h3 className="mt-2 font-serif text-lg text-stone-900">
                                            {product.name}
                                        </h3>

                                        <div className="mt-2 flex items-center justify-between gap-2">
                                            <p className="text-sm font-medium">
                                                ₹{Number(product.price ?? 0).toLocaleString('en-IN')}
                                            </p>

                                            <span className="flex items-center gap-1 text-xs text-stone-600">
                                                <Star
                                                    size={13}
                                                    className="fill-[#B28A50] text-[#B28A50]"
                                                />
                                                {product.rating ?? 'New'}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}

export default FeaturedProducts
