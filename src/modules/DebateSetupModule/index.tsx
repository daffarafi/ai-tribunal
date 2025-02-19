'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FirstStep } from './module-elements/FirstStep'
import { SecondStep } from './module-elements/SecondStep'

const publicFigures = [
  'Albert Einstein',
  'Marie Curie',
  'Nikola Tesla',
  'Stephen Hawking',
  'Ada Lovelace',
  'Alan Turing',
  'Grace Hopper',
  'Richard Feynman',
]

const topicSuggestions = [
  'The future of artificial intelligence',
  'Climate change and renewable energy',
  'The ethics of genetic engineering',
  'Space exploration and colonization',
  'Quantum computing and its applications',
  'The role of technology in education',
  'Cybersecurity and privacy in the digital age',
  'The impact of social media on society',
]

export const DebateSetupModule = () => {
  const [step, setStep] = useState(1)
  const [figure1, setFigure1] = useState('')
  const [figure2, setFigure2] = useState('')
  const [topic, setTopic] = useState('')
  const [figure1Image, setFigure1Image] = useState('/placeholder.svg')
  const [figure2Image, setFigure2Image] = useState('/placeholder.svg')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(
      `/debate?figure1=${figure1}&figure2=${figure2}&topic=${topic}&image1=${figure1Image}&image2=${figure2Image}`
    )
  }

  const handleNext = () => {
    if (step === 1 && figure1 && figure2) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-40 ">
      <h1 className="font-orbitron text-4xl font-bold mb-8 text-center font-tech text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
        Configure Your AI Debate
      </h1>

      <div className="mb-8 flex justify-center">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-blue-800'} flex items-center justify-center`}
          >
            1
          </div>
          <div
            className={`w-16 h-1 ${step === 2 ? 'bg-blue-500' : 'bg-blue-800'}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-blue-800'} flex items-center justify-center`}
          >
            2
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <FirstStep
            figure1={figure1}
            figure2={figure2}
            figure1Image={figure1Image}
            figure2Image={figure2Image}
            setFigure1={setFigure1}
            setFigure2={setFigure2}
            setFigure1Image={setFigure1Image}
            setFigure2Image={setFigure2Image}
            handleNext={handleNext}
            publicFigures={publicFigures}
          />
        )}

        {step === 2 && (
          <SecondStep
            topic={topic}
            setTopic={setTopic}
            handleBack={handleBack}
            topicSuggestions={topicSuggestions}
          />
        )}
      </form>
    </div>
  )
}
