import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Team from '../components/Team'
import StatsCounter from '../components/StateCounter'
import FAQs from '../components/FAQs'
import DonationForm from '../components/DonationForm'
import HeroSection from '../components/HeroSection'
import BackToTopButton from '../components/BackToTopButton'
import ChatbotIcon from '../components/ChatbotIcon'

export default function about() {
  return (
    <div>
        <NavBar />
        <div className='mt-13'></div>
        <HeroSection />
        <Team />.
        <StatsCounter />
        <FAQs />
        <ChatbotIcon />
        <BackToTopButton />
        <Footer />
    </div>
  )
}
