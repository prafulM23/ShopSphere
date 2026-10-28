
import { ArrowUpRight } from 'lucide-react'

const categories = [
    {
        name: 'Watches',
        subtitle: 'Time, refined.',
        image:
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80',
    },
    {
        name: 'Accessories',
        subtitle: 'The finishing touch.',
        image:
            'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80',
    },
    {
        name: 'Lifestyle',
        subtitle: 'Everyday, elevated.',
        image:
            'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=80',
    },
]

const CategorySection = () => {
    return (
        <section id="categories" className="bg-[#F7F3EC] px-5 py-20 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-[#9A7747]">
                            Find your signature
                        </p>
                        <h2 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">
                            Explore the collections
                        </h2>
                    </div>
                    <a
                        href="#products"
                        className="hidden items-center gap-2 text-sm sm:flex"
                    >
                        View all <ArrowUpRight size={16} />
                    </a>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <a
                            href="#products"
                            key={category.name}
                            className={`group relative min-h-[340px] overflow-hidden bg-stone-900 ${index === 1 ? 'lg:translate-y-6' : ''
                                }`}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5" />

                            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-6 text-white">
                                <div>
                                    <p className="mb-2 text-xs tracking-widest text-[#D7B77D]">
                                        {category.subtitle}
                                    </p>
                                    <h3 className="font-serif text-3xl">{category.name}</h3>
                                </div>
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 transition group-hover:bg-white group-hover:text-black">
                                    <ArrowUpRight size={19} />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategorySection
