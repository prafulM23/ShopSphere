
import { PackageCheck, ShieldCheck, Headset, RefreshCw } from 'lucide-react'

const benefits = [
    {
        icon: PackageCheck,
        title: 'Thoughtful Delivery',
        description: 'Carefully packed, delivered to you.',
    },
    {
        icon: ShieldCheck,
        title: 'Quality First',
        description: 'Products selected with care.',
    },
    {
        icon: RefreshCw,
        title: 'Easy Returns',
        description: 'A smoother shopping experience.',
    },
    {
        icon: Headset,
        title: 'Here to Help',
        description: 'Support when you need it.',
    },
]

const BenefitsSection = () => {
    return (
        <section id="about" className="border-y border-stone-200 bg-[#F7F3EC] px-5 py-14 lg:px-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
                {benefits.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="text-center">
                        <Icon className="mx-auto text-[#A58150]" size={27} strokeWidth={1.4} />
                        <h3 className="mt-4 font-serif text-lg text-stone-900">{title}</h3>
                        <p className="mt-2 text-xs leading-5 text-stone-500">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BenefitsSection
