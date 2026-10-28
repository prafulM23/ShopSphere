
import CategorySection from '../components/CategorySection'
import FeaturedProducts from '../components/FeaturedProducts'
import BenefitsSection from '../components/BenefitsSection'
import NewsletterSection from '../components/NewsletterSection'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <CategorySection />
                <FeaturedProducts />
                <BenefitsSection />
                <NewsletterSection />
            </main>
            <Footer />
        </>
    )
}

export default Home
