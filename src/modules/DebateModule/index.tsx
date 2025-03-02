'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import create_debate_script from '@/lib/DeepSeekAI'
import generate_script_gemini from '@/lib/GeminiAI'
import { get_img_ai_panel } from '@/lib/GetImgAI'
import type { DebateScript, GeneratedImageURL } from '@/lib/interface'
import { useWalletSelector } from '@near-wallet-selector/react-hook'
import { toast } from 'sonner'
import { HelloNearContract } from '@/config'

import { DUMMY_SCRIPT } from './contants'
import { DebateResult } from './module-elements/DebateResult'

export const DebateModule = () => {
  const router = useRouter()
  const { signedAccountId, callFunction } = useWalletSelector()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isDebateFinished, setIsDebateFinished] = useState<boolean>(false)
  const [debateData, setDebateData] = useState<DebateScript | null>(null)
  const [roundImages, setRoundImages] = useState<GeneratedImageURL[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const skipRef = useRef<boolean>(false)
  const [isResultShowing, setIsResultShowing] = useState<boolean>(false)

  const figure1 = searchParams.get('figure1') ?? 'Alan Turing'
  const figure2 = searchParams.get('figure2') ?? 'Albert Einstein'
  const topic = searchParams.get('topic') ?? 'AI and its impact on society'
  const figure1Image = searchParams.get('image1') ?? '/figures/alan-turing.webp'
  const figure2Image =
    searchParams.get('image2') ?? '/figures/albert-einstein.webp'
  const fallbackImage =
    searchParams.get('image1') ?? '/figures/alan-turing.webp'

  console.log('figure1Image: ', figure1Image)

  // Fetch debate script dynamically using async/await with error handling
  useEffect(() => {
    // async function fetchDebate() {
    //   try {
    //     const res = await create_debate_script(topic, figure1, figure2)
    //     setDebateData(res as unknown as DebateScript)
    //     setError(null)
    //   } catch (e: unknown) {
    //     const errorMessage = e instanceof Error ? e.message : 'Unknown error'
    //     setError(`Error fetching debate data: ${errorMessage}`)
    //   }
    // }
    // void fetchDebate()

    async function fetchDebate() {
      try {
        const res = await generate_script_gemini(topic, figure1, figure2)
        setDebateData(res as unknown as DebateScript)
        setError(null)
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error'
        setError(`Error fetching debate data: ${errorMessage}`)
      }
    }
    void fetchDebate()
    // setDebateData(DUMMY_SCRIPT)
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

  useEffect(() => {
    setLoggedIn(!!signedAccountId)
  }, [signedAccountId])

  const publishDebate = async () => {
    if (!loggedIn) {
      toast.error('Please login first!')
      return
    }
    console.log(debateData?.debate)
    console.log(roundImages)

    // Buat objek hasil penggabungan
    const finalData = {
      topic: topic,
      figure_1_name: figure1,
      figure_1_image_url: figure1Image,
      figure_2_name: figure2,
      figure_2_image_url: figure2Image,
      debate_dialogue: debateData?.debate.map((round, index) => [
        round.name,
        round.message,
        roundImages[index].url,
      ]),
    }

    console.log(finalData)

    try {
      setLoading(true)
      callFunction({
        contractId: HelloNearContract,
        method: 'create_debate',
        args: finalData,
      }).then(async () => {
        router.push('/archives')
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Success add new session!')
      router.push('/archives')
    } catch (err) {
      console.log(err)
      toast.error('Failed to add new session!')
    } finally {
      setLoading(false)
    }
  }

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
      <div className="container absolute bottom-0 flex left-[50%] -translate-x-[50%]  gap-8 items-end py-10">
        <div className="flex w-full justify-between items-end">
          {/* Text Box with Typing Effect */}
          <div className="w-full bg-black/70 rounded-lg p-6  min-h-[200px] border-4 border-blue-400">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              {currentRound.name}
            </h2>
            <p className="text-xl text-white">{currentRound.message}</p>
            {/* Next Button */}
            {!isDebateFinished ? (
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                {currentStep < debateData.debate.length - 1 ? 'Next' : 'Finish'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <h2 className="text-3xl text-yellow-300">Debate Finished</h2>
                <Button onClick={() => setIsResultShowing(!isResultShowing)}>
                  Show Result
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <DebateResult
        topic={topic}
        figure1Name={figure1}
        figure1ImageUrl={figure1Image}
        figure2Name={figure2}
        figure2ImageUrl={figure2Image}
        handleReplay={() => {
          setCurrentStep(0)
          setIsDebateFinished(false)
          setIsResultShowing(false)
        }}
        dialogue={debateData.debate.map((round) => [round.name, round.message])}
        isShowing={isResultShowing}
        setIsShowing={setIsResultShowing}
        publishDebate={publishDebate}
      />
    </div>
  )
}
