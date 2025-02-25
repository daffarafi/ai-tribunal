'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import create_debate_script from '@/lib/DeepSeekAI'
import { get_img_ai_panel } from '@/lib/GetImgAI'
import type { DebateScript, GeneratedImageURL } from '@/lib/interface'

export const DebateModule = () => {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isDebateFinished, setIsDebateFinished] = useState<boolean>(false)
  const [debateData, setDebateData] = useState<DebateScript | null>(null)
  const [roundImages, setRoundImages] = useState<GeneratedImageURL[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const skipRef = useRef<boolean>(false)

  const figure1 = searchParams.get('figure1') ?? 'Alan Turing'
  const figure2 = searchParams.get('figure2') ?? 'Albert Einstein'
  const topic = searchParams.get('topic') ?? 'AI and its impact on society'
  const fallbackImage =
    searchParams.get('image1') ?? '/figures/alan-turing.webp'

  // Fetch debate script dynamically using async/await with error handling
  useEffect(() => {
    async function fetchDebate() {
      try {
        const res = await create_debate_script(topic, figure1, figure2)
        setDebateData(res as unknown as DebateScript)
        setError(null)
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error'
        setError(`Error fetching debate data: ${errorMessage}`)
      }
    }
    void fetchDebate()
  }, [topic, figure1, figure2])

  // When debateData is available, fetch images for each round concurrently
  useEffect(() => {
    async function fetchRoundImages() {
      if (debateData) {
        try {
          const images: GeneratedImageURL[] = await Promise.all(
            debateData.debate.map(async (round) => {
              const result = await get_img_ai_panel(
                round.name,
                round.description
              )
              // Ensure result is always treated as GeneratedImageURL
              if (typeof result === 'string') {
                return { url: result, cost: 0 } // Convert string to object
              }
              return result // Otherwise, assume it's already { cost, url }
            })
          )
          setRoundImages(images) // Correctly assign the array without type errors
        } catch (e: unknown) {
          console.error('Error fetching round images', e)
          // In case of error, use fallback images for missing rounds
          setRoundImages(
            debateData.debate.map(() => ({ cost: 0, url: fallbackImage }))
          )
        } finally {
          setIsLoading(false)
        }
      }
    }
    void fetchRoundImages()
  }, [debateData, fallbackImage])

  // Early returns for loading or error
  if (isLoading) {
    return <p>Loading debate...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  if (!debateData || roundImages.length !== debateData.debate.length) {
    return <p>Preparing debate rounds...</p>
  }

  const currentRound = debateData.debate[currentStep]
  const currentImage = roundImages[currentStep]?.url ?? fallbackImage

  const handleNext = () => {
    if (currentStep < debateData.debate.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsDebateFinished(true)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-size background image for current debate round */}
      <Image
        src={currentImage}
        alt="Debate Round"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60">
        <h1 className="text-4xl font-bold text-white mb-6">
          {currentRound.name}
        </h1>
        <p className="text-xl text-white max-w-2xl text-center mb-8">
          {currentRound.message}
        </p>
        {!isDebateFinished ? (
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            {currentStep < debateData.debate.length - 1 ? 'Next' : 'Finish'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <h2 className="text-3xl text-yellow-300">Debate Finished</h2>
        )}
      </div>
    </div>
  )
}
