import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import FAQ from '../components/home/FAQ'
import Support from '../components/home/Support'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonial />
      <FAQ />
      <Support />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
