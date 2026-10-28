
import { ArrowUpRight } from 'lucide-react'
const Footer = () => {
    return (
        <footer className="bg-[#171717] px-5 py-12 text-white lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <a href="/" className="font-serif text-3xl font-bold">
                            ShopSphere<span className="text-[#B28A50]">.</span>
                        </a>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-stone-400">
                            Thoughtfully selected pieces for a life well considered.
                            Discover your own kind of timeless.
                        </p>
                        {/* <div className="mt-5 flex gap-4 text-stone-300">
                            <a href="#instagram" aria-label="Instagram">
                                <Instagram size={19} />
                            </a>
                        </div> */}
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D7B77D]">
                            Explore
                        </h3>
                        <div className="mt-5 space-y-3 text-sm text-stone-400">
                            <a href="/" className="block hover:text-white">Home</a>
                            <a href="#categories" className="block hover:text-white">Collections</a>
                            <a href="#products" className="block hover:text-white">Shop All</a>
                            <a href="#about" className="block hover:text-white">Our Story</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D7B77D]">
                            Customer Care
                        </h3>
                        <div className="mt-5 space-y-3 text-sm text-stone-400">
                            <a href="#contact" className="flex items-center gap-1 hover:text-white">
                                Contact Us <ArrowUpRight size={13} />
                            </a>
                            <a href="#shipping" className="block hover:text-white">Shipping Information</a>
                            <a href="#returns" className="block hover:text-white">Returns & Exchanges</a>
                            <a href="#privacy" className="block hover:text-white">Privacy Policy</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row">
                    <p>© {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
                    <p>Considered design. Timeless living.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
