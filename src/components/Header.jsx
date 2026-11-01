
import { useState } from 'react'
import {
    Search,
    UserRound,
    Heart,
    ShoppingBag,
    Menu,
    X,
    LogOut,
    ChevronDown
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAccountOpen, setIsAccountOpen] = useState(false)
    const { cartCount } = useCart()
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Collections', href: '#categories' },
        { name: 'Shop All', href: '#products' },
        { name: 'Our Story', href: '#about' },
    ]

    const handleLogout = () => {
        logout()
        setIsMenuOpen(false)
        navigate('/')
    }

    return (
        <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F7F3EC]/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-10">

                <Link
                    to="/"
                    className="font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"
                >
                    ShopSphere<span className="text-[#B28A50]">.</span>
                </Link>

                <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`transition hover:text-[#B28A50] ${index === 0 ? 'text-[#B28A50]' : ''
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">

                    <button aria-label="Search" className="hidden sm:block">
                        <Search size={20} strokeWidth={1.5} />
                    </button>

                    {isAuthenticated ? (
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setIsAccountOpen(!isAccountOpen)}
                                className="flex items-center gap-2"
                                aria-label="Account menu"
                                aria-expanded={isAccountOpen}
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#29231D] text-sm font-medium uppercase text-white">
                                    {user?.name?.charAt(0)}
                                </span>

                                <ChevronDown
                                    size={15}
                                    className={`transition-transform ${isAccountOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isAccountOpen && (
                                <div className="absolute right-0 top-12 z-50 w-56 border border-stone-200 bg-white p-4 shadow-lg">
                                    <p className="font-medium text-stone-900">
                                        {user?.name}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-stone-500">
                                        {user?.email}
                                    </p>

                                    <div className="my-3 border-t border-stone-200" />

                                    <button
                                        onClick={() => {
                                            setIsAccountOpen(false)
                                            handleLogout()
                                        }}
                                        className="flex w-full items-center gap-2 text-sm text-red-700 hover:text-red-900"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            aria-label="Login"
                            className="hidden sm:block"
                        >
                            <UserRound size={20} strokeWidth={1.5} />
                        </Link>
                    )}

                    <button aria-label="Wishlist" className="hidden sm:block">
                        <Heart size={20} strokeWidth={1.5} />
                    </button>

                    <Link
                        to="/cart"
                        aria-label={`Shopping bag with ${cartCount} items`}
                        className="relative"
                    >
                        <ShoppingBag size={20} strokeWidth={1.5} />

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9A7747] px-1 text-[10px] text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden"
                    >
                        {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <nav className="border-t border-stone-200 bg-[#F7F3EC] px-5 py-4 md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col">

                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="border-b border-stone-200 py-4 text-sm transition hover:text-[#B28A50] last:border-b-0"
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="mt-3 border-t border-stone-200 pt-4">
                            {isAuthenticated ? (
                                <>
                                    <p className="mb-4 flex items-center gap-2 text-sm">
                                        <UserRound size={18} />
                                        Welcome, {user?.name}
                                    </p>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 py-2 text-sm text-red-700"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-sm hover:text-[#B28A50]"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-sm hover:text-[#B28A50]"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            )}
        </header>
    )
}

export default Header
