
import { ArrowUpRight } from 'lucide-react'

const HeroSection = () => {
    return (
        <section className="bg-[#F7F3EC]">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20 lg:px-10 lg:py-24">
                <div className="max-w-xl">
                    <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#9A7747]">
                        <span className="h-px w-9 bg-[#B28A50]" />
                        A more considered collection
                    </p>

                    <h1 className="font-serif text-5xl leading-[1.12] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
                        Elegance in
                        <br />
                        every <span className="text-[#A58150] italic">detail.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-stone-600">
                        Discover thoughtfully selected pieces that bring timeless style
                        and understated luxury into your everyday life.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <a
                            href="#products"
                            className="inline-flex items-center gap-3 bg-stone-900 px-7 py-4 text-sm font-medium text-white transition hover:bg-[#A58150]"
                        >
                            Explore Collection <ArrowUpRight size={17} />
                        </a>
                        <a
                            href="#categories"
                            className="border-b border-stone-400 pb-1 text-sm text-stone-800"
                        >
                            Discover more
                        </a>
                    </div>

                    <div className="mt-12 flex gap-8 border-t border-stone-300 pt-6">
                        <div>
                            <p className="font-serif text-2xl text-stone-900">Curated</p>
                            <p className="mt-1 text-xs text-stone-500">With intention</p>
                        </div>
                        <div>
                            <p className="font-serif text-2xl text-stone-900">Timeless</p>
                            <p className="mt-1 text-xs text-stone-500">By design</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-3 border border-[#B28A50]/30" />
                    <img
                        src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=85"
                        alt="Luxury wristwatch"
                        className="relative h-[400px] w-full object-cover sm:h-[520px]"
                    />
                    <div className="absolute bottom-5 left-5 bg-[#F7F3EC] px-5 py-4 sm:bottom-8 sm:left-8">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9A7747]">
                            The signature edit
                        </p>
                        <p className="mt-1 font-serif text-xl text-stone-900">
                            Made to be remembered.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
