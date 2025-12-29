import React from 'react'
import HeroSection from './_components/hero-section'
import FeatureInstructors from './_components/feature-component'
import FeatureStep from './_components/feature-step'
import { TestimonialsInstrutors } from './_components/testimonials-section'
import CTAInstructors from './_components/call-to-action-instructors'

export default function Instructors() {
  return (
    <div>
        <HeroSection />
        <FeatureInstructors />
        <FeatureStep />
        <TestimonialsInstrutors />
        <CTAInstructors />
    </div>
  )
}
