'use client'

import type React from 'react'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FirstStep } from './module-elements/FirstStep'
import { SecondStep } from './module-elements/SecondStep'
import { toast } from 'sonner'
import { get_img_ai_profile } from '@/lib/GetImgAI'
import {
  generate_character_suggestions,
  generate_topic_suggestions,
  get_typing_suggestions,
} from '@/lib/GeminiAI'
import { useImageContext } from '@/contexts/ImageContext'

export const DebateSetupModule = () => {
  const { setFigure1Image, setFigure2Image, figure1Image, figure2Image } =
    useImageContext()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [figure1, setFigure1] = useState('')
  const [figure2, setFigure2] = useState('')
  const [topic, setTopic] = useState('')
  const [publicFigures, setPublicFigures] = useState<string[]>([])
  const [loadingPublicFigures, setLoadingPublicFigures] =
    useState<boolean>(true)
  const [loadingFirstImage, setLoadingFirstImage] = useState<boolean>(false)
  const [loadingSecondImage, setLoadingSecondImage] = useState<boolean>(false)
  const [topicSuggestions, setTopicSuggestions] = useState<string[]>([])
  const [loadingTopicSuggestions, setLoadingTopicSuggestions] =
    useState<boolean>(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    params.set('figure1', figure1)
    params.set('figure2', figure2)
    params.set('topic', topic)

    router.push('/debate' + '?' + params.toString())
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

  const getFigureImage = useCallback(
    async (
      figure: string,
      setFigure: (url: string) => void,
      setLoading: (bool: boolean) => void
    ) => {
      if (!figure) {
        return
      }
      try {
        setLoading(true)
        const res = await get_img_ai_profile(figure)
        setFigure((res as { image: string }).image)
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error'
        toast.error(`Error fetching image for ${figure1}: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    },
    [figure1]
  )

  useEffect(() => {
    console.log('figure1')
    void getFigureImage(figure1, setFigure1Image, setLoadingFirstImage)
  }, [figure1])

  useEffect(() => {
    void getFigureImage(figure2, setFigure2Image, setLoadingSecondImage)
  }, [figure2])

  const fetchSuggestion = useCallback(async () => {
    try {
      setLoadingPublicFigures(true)
      const res = await generate_character_suggestions()
      console.log(res)
      setPublicFigures(res)
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'
      toast.error(`Error fetching characters suggestion: ${errorMessage}`)
    } finally {
      setLoadingPublicFigures(false)
    }
  }, [])

  const searchPublicFigures = useCallback(async (query: string) => {
    try {
      setLoadingPublicFigures(true)

      const res = await get_typing_suggestions(query)
      console.log('Search results:', res)
      setPublicFigures(res)
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'
      toast.error(`Error searching characters: ${errorMessage}`)
    } finally {
      setLoadingPublicFigures(false)
    }
  }, [])

  const fetchTopicSuggestions = useCallback(async () => {
    try {
      setLoadingTopicSuggestions(true)
      console.log(figure1, figure2)
      const res = await generate_topic_suggestions(figure1, figure2)
      console.log(res)
      setTopicSuggestions(res)
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'
      toast.error(`Error fetching topic suggestions: ${errorMessage}`)
    } finally {
      setLoadingTopicSuggestions(false)
    }
  }, [figure1, figure2])

  useEffect(() => {
    void fetchSuggestion()
  }, [fetchSuggestion])

  useEffect(() => {
    if (step !== 2) return
    void fetchTopicSuggestions()
  }, [step])

  useEffect(() => {
    setFigure1Image('/placeholder.png')
    setFigure2Image('/placeholder.png')
  }, [])

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
            handleNext={handleNext}
            publicFigures={publicFigures}
            loadingPublicFigures={loadingPublicFigures}
            searchPublicFigures={searchPublicFigures}
            loadingFirstImage={loadingFirstImage}
            loadingSecondImage={loadingSecondImage}
          />
        )}

        {step === 2 && (
          <SecondStep
            topic={topic}
            setTopic={setTopic}
            handleBack={handleBack}
            topicSuggestions={topicSuggestions}
            loadingTopicSuggestions={loadingTopicSuggestions}
          />
        )}
      </form>
    </div>
  )
}
