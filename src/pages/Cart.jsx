
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ArrowLeft,
} from 'lucide-react'

import { useCart } from '../context/CartContext'

const Cart = () => {
    const {
        cartItems,
        cartCount,
        cartTotal,
        cartLoading,
        cartError,
        removeFromCart,
        updateQuantity,
    } = useCart()

    const [actionError, setActionError] = useState('')

    const getProductImage = (product) => {
        return (
            product?.imageUrl ??
            product?.imageURL ??
            product?.image ??
            (Array.isArray(product?.images)
                ? product.images[0]?.imageUrl ??
                product.images[0]?.url ??
                product.images[0]
                : '')
        )
    }

    const handleQuantityUpdate = async (itemId, quantity) => {
        try {
            setActionError('')
            await updateQuantity(itemId, quantity)
        } catch (error) {
            setActionError(
                error.response?.data?.message || 'Unable to update quantity.'
            )
        }
    }

    const handleRemove = async (itemId) => {
        try {
            setActionError('')
            await removeFromCart(itemId)
        } catch (error) {
            setActionError(
                error.response?.data?.message || 'Unable to remove item.'
            )
        }
    }

    if (cartLoading && cartItems.length === 0) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#F5F0E8]">
                <p className="text-sm text-stone-600">
                    Loading your shopping bag...
                </p>
            </main>
        )
    }

    if (cartError && cartItems.length === 0) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F5F0E8] px-5 text-center">
                <p className="text-sm text-red-600">{cartError}</p>

                <Link
                    to="/"
                    className="mt-6 bg-stone-900 px-8 py-4 text-xs uppercase tracking-widest text-white"
                >
                    Continue Shopping
                </Link>
            </main>
        )
    }

    if (cartItems.length === 0) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F5F0E8] px-5 text-center">
                <ShoppingBag
                    size={48}
                    strokeWidth={1}
                    className="text-stone-500"
                />

                <h1 className="mt-6 font-serif text-4xl text-stone-900">
                    Your bag is empty
                </h1>

                <p className="mt-3 text-sm text-stone-500">
                    Discover something beautiful for your collection.
                </p>

                <Link
                    to="/"
                    className="mt-7 bg-stone-900 px-8 py-4 text-xs uppercase tracking-widest text-white transition hover:bg-[#9A7747]"
                >
                    Continue Shopping
                </Link>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#F5F0E8] px-5 py-12 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-stone-600 hover:text-[#9A7747]"
                >
                    <ArrowLeft size={16} />
                    Continue Shopping
                </Link>

                <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#9A7747]">
                        Your Selection
                    </p>

                    <h1 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">
                        Shopping Bag
                    </h1>

                    <p className="mt-3 text-sm text-stone-500">
                        {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag
                    </p>
                </div>

                {actionError && (
                    <p className="mb-5 text-sm text-red-600" role="alert">
                        {actionError}
                    </p>
                )}

                <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
                    <div className="space-y-6">
                        {cartItems.map((item) => {
                            const product = item.product
                            const image = getProductImage(product)

                            return (
                                <article
                                    key={item.id}
                                    className="flex gap-4 border-b border-stone-300 pb-6 sm:gap-6"
                                >
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="h-32 w-28 shrink-0 overflow-hidden bg-[#EAE4DA] sm:h-40 sm:w-36"
                                    >
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs text-stone-400">
                                                No image
                                            </div>
                                        )}
                                    </Link>

                                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                                        <div>
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="font-serif text-lg text-stone-900 hover:text-[#9A7747]"
                                            >
                                                {product.name}
                                            </Link>

                                            <p className="mt-2 text-sm font-medium text-stone-700">
                                                ₹{Number(product.price ?? 0).toLocaleString('en-IN')}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center border border-stone-400">
                                                <button
                                                    type="button"
                                                    disabled={item.quantity <= 1 || cartLoading}
                                                    onClick={() =>
                                                        handleQuantityUpdate(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>

                                                <span className="min-w-8 text-center text-sm">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={cartLoading}
                                                    onClick={() =>
                                                        handleQuantityUpdate(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-stone-200 disabled:opacity-40"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                disabled={cartLoading}
                                                onClick={() => handleRemove(item.id)}
                                                className="flex items-center gap-1 text-xs text-stone-500 transition hover:text-red-600 disabled:opacity-40"
                                            >
                                                <Trash2 size={14} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <p className="hidden text-sm font-medium text-stone-900 sm:block">
                                        ₹{(
                                            Number(product.price ?? 0) *
                                            item.quantity
                                        ).toLocaleString('en-IN')}
                                    </p>
                                </article>
                            )
                        })}
                    </div>

                    <aside className="h-fit bg-white p-6">
                        <h2 className="font-serif text-2xl text-stone-900">
                            Order Summary
                        </h2>

                        <div className="mt-6 flex justify-between text-sm text-stone-600">
                            <span>Items ({cartCount})</span>
                            <span>
                                ₹{cartTotal.toLocaleString('en-IN')}
                            </span>
                        </div>

                        <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-base font-medium text-stone-900">
                            <span>Subtotal</span>
                            <span>
                                ₹{cartTotal.toLocaleString('en-IN')}
                            </span>
                        </div>

                        <p className="mt-3 text-xs text-stone-500">
                            Shipping and taxes calculated at checkout.
                        </p>

                        <button
                            type="button"
                            disabled
                            className="mt-7 w-full cursor-not-allowed bg-stone-300 px-6 py-4 text-xs uppercase tracking-widest text-stone-600"
                        >
                            Checkout — Coming Soon
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default Cart
