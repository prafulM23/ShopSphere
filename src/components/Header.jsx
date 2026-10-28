
import { useState } from 'react'
import {
    Search,
    UserRound,
    Heart,
    ShoppingBag,
    Menu,
    X,
} from 'lucide-react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Collections', href: '#categories' },
        { name: 'Shop All', href: '#products' },
        { name: 'Our Story', href: '#about' },
    ]

    return (
        <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F7F3EC]/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-10">
                <a
                    href="/"
                    className="font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"
                >
                    ShopSphere<span className="text-[#B28A50]">.</span>
                </a>

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

                    <button aria-label="Account" className="hidden sm:block">
                        <UserRound size={20} strokeWidth={1.5} />
                    </button>

                    <button aria-label="Wishlist" className="hidden sm:block">
                        <Heart size={20} strokeWidth={1.5} />
                    </button>

                    <button aria-label="Shopping bag" className="relative">
                        <ShoppingBag size={21} strokeWidth={1.5} />
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B28A50] text-[10px] text-white">
                            0
                        </span>
                    </button>

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
                    </div>
                </nav>
            )}
        </header>
    )
}

export default Header
