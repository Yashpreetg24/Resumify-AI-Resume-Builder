import React from 'react'
import Navbar from '../components/Navbar'
import ModernHero from '../components/home/ModernHero'
import ModernFeatures from '../components/home/ModernFeatures'
import ModernTestimonials from '../components/home/ModernTestimonials'
import ModernFAQ from '../components/home/ModernFAQ'
import ModernCTA from '../components/home/ModernCTA'
import ModernFooter from '../components/home/ModernFooter'

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <ModernHero />
      <ModernFeatures />
      <ModernTestimonials />
      <ModernFAQ />
      <ModernCTA />
      <ModernFooter />
    </div>
  )
}

export default Home
