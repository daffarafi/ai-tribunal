import React from 'react'
import { Header } from './sections/Header'
import { MechanicsSection } from './sections/MechanicsSection'
import { DebateFormSection } from './sections/DebateFormSection'

export const LandingPageModule: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-5"></div>
      <div className=" bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
        <Header />
        <MechanicsSection />
      </div>

      <DebateFormSection />
    </>
  )
}
