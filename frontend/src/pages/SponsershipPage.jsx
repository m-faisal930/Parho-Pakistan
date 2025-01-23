import React from 'react'
import DonationForm from '../components/DonationForm'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function SponsershipPage() {
  return (
    <div className='min-h-screen bg-light'>
        <NavBar />
        <div className='mt-16'></div>
        <DonationForm />      
        <Footer />
    </div>
  )
}
