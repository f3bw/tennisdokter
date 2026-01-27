import { About } from '@/components/about'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Pricing } from '@/components/pricing'
import { Sponsors } from '@/components/sponsors'
import { Trainers } from '@/components/trainers'
import { WhatsAppButton } from '@/components/whatsapp-button'

const Home = () => {
    return (
        <>
            <main>
                <Hero />
                <About />
                <HowItWorks />
                <Trainers />
                <Pricing />
                <Sponsors />
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}

export default Home
