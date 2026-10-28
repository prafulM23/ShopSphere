
import { Heart, ShoppingBag, Star } from 'lucide-react'

const products = [
    {
        id: 1,
        name: 'Classic Gold Watch',
        category: 'TIMEPIECES',
        price: 12999,
        rating: '4.8',
        image:
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=80',
        tag: 'BESTSELLER',
    },
    {
        id: 2,
        name: 'Signature Bracelet',
        category: 'ACCESSORIES',
        price: 2499,
        rating: '4.7',
        image:
            'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80',
        tag: 'NEW ARRIVAL',
    },
    {
        id: 3,
        name: 'Everyday Timepiece',
        category: 'TIMEPIECES',
        price: 8999,
        rating: '4.9',
        image:
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80',
        tag: '',
    },
    {
        id: 4,
        name: 'Modern Living Piece',
        category: 'LIFESTYLE',
        price: 3299,
        rating: '4.6',
        image:
            'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=80',
        tag: 'CURATED',
    },
]

const FeaturedProducts = () => {
    return (
        <section id="products" className="bg-white px-5 py-20 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex items-end justify-between gap-4">
                    <div>
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
                    <a
                        href="#categories"
                        className="hidden border-b border-stone-400 pb-1 text-sm sm:block"
                    >
                        Explore all products
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">
                    {products.map((product) => (
                        <article key={product.id} className="group">
                            <div className="relative overflow-hidden bg-[#F4F0E9]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-80"
                                />

                                {product.tag && (
                                    <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[9px] font-semibold tracking-wider text-stone-800">
                                        {product.tag}
                                    </span>
                                )}

                                <button
                                    aria-label={`Add ${product.name} to wishlist`}
                                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
                                >
                                    <Heart size={17} strokeWidth={1.5} />
                                </button>

                                <button className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-stone-900 py-3 text-xs font-medium text-white transition hover:bg-[#A58150]">
                                    <ShoppingBag size={15} /> Add to Bag
                                </button>
                            </div>

                            <div className="pt-4">
                                <p className="text-[10px] tracking-[0.16em] text-stone-500">
                                    {product.category}
                                </p>
                                <h3 className="mt-2 font-serif text-lg text-stone-900">
                                    {product.name}
                                </h3>
                                <div className="mt-2 flex items-center justify-between gap-2">
                                    <p className="text-sm font-medium">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </p>
                                    <span className="flex items-center gap-1 text-xs text-stone-600">
                                        <Star size={13} className="fill-[#B28A50] text-[#B28A50]" />
                                        {product.rating}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
