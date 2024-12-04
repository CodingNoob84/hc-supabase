import AboutMe from '@/components/website/about-me'
import Footer from '@/components/website/footer'
import Header from '@/components/website/header'
import Hero from '@/components/website/hero-section'
import Reviews from '@/components/website/reviews-section'

export default async function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Hero />
                <Reviews />
                <AboutMe />
            </main>
            <Footer />
        </div>
    )
}
