'use client'
import React from 'react'
import { HomePage } from './sections/Header'
// import { MechanicsSection } from './sections/MechanicsSection'
// import { DebateFormSection } from './sections/DebateFormSection'

export const LandingPageModule: React.FC = () => {
  return (
    <>
      <div className=" bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
        <HomePage />
        {/* <MechanicsSection /> */}
      </div>

      {/* <DebateFormSection /> */}
    </>
  )
}
