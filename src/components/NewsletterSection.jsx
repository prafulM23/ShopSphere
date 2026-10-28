
import { ArrowRight } from 'lucide-react'

const NewsletterSection = () => {
    return (
        <section className="bg-stone-900 px-5 py-16 text-white lg:px-10 lg:py-20">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#D7B77D]">
                        The ShopSphere letter
                    </p>
                    <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                        A little more inspiration.
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-stone-300">
                        Discover new arrivals, considered collections and occasional
                        notes from our world.
                    </p>
                </div>

                <form
                    onSubmit={(event) => event.preventDefault()}
                    className="flex w-full max-w-md border-b border-stone-500 pb-3"
                >
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        placeholder="Your email address"
                        className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-stone-400"
                        required
                    />
                    <button type="submit" aria-label="Subscribe">
                        <ArrowRight className="text-[#D7B77D]" />
                    </button>
                </form>
            </div>
        </section>
    )
}

export default NewsletterSection
