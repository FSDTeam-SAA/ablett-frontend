import AboutSection from '@/components/web-componets/AboutSection'
import CompanyLogos from '@/components/web-componets/CompanyLogos'
import ConstructionProcess from '@/components/web-componets/construction-process'
import FutureProject from '@/components/web-componets/FutureProject'
import Hero from '@/components/web-componets/hero'
import ServicesSection from '@/components/web-componets/services-section'
import TestimonialsSection from '@/components/web-componets/testimonials-section'
import WhyChooseUs from '@/components/web-componets/why-choose-us'
import React from 'react'

const page = () => {
  return (
     <main>
      <Hero />
      <CompanyLogos/>
      <AboutSection/>
      <ServicesSection/>
      <WhyChooseUs/>
      <FutureProject/>
      <ConstructionProcess/>
      <TestimonialsSection/>
    </main>
  )
}

export default page
