'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import generate_script_gemini from '@/lib/GeminiAI'
import { get_img_ai_panel } from '@/lib/GetImgAI'
import type { DebateScript, GeneratedImageB64 } from '@/lib/interface'
import { useWalletSelector } from '@near-wallet-selector/react-hook'
import { toast } from 'sonner'
import { HelloNearContract } from '@/config'
import { MultiStepLoader } from '@/components/ui/multi-step-loader'

import { DebateResult } from './module-elements/DebateResult'
import { useImageContext } from '@/contexts/ImageContext'
import { uploadToCloudinary } from '@/utils/cloudinary/uploadToCloudinary'

export const DebateModule = () => {
  const { figure1Image, figure2Image } = useImageContext()
  const router = useRouter()
  const { signedAccountId, callFunction } = useWalletSelector()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isDebateFinished, setIsDebateFinished] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const [debateData, setDebateData] = useState<DebateScript | null>(null)
  const [roundImages, setRoundImages] = useState<GeneratedImageB64[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const skipRef = useRef<boolean>(false)
  const [isResultShowing, setIsResultShowing] = useState<boolean>(false)
  const [loadingStep, setLoadingStep] = useState<number>(0)

  const figure1 = searchParams.get('figure1') ?? 'Alan Turing'
  const figure2 = searchParams.get('figure2') ?? 'Albert Einstein'
  const topic = searchParams.get('topic') ?? 'AI and its impact on society'

  const fallbackImage =
    searchParams.get('image1') ?? '/figures/alan-turing.webp'

  // Fetch debate script dynamically using async/await with error handling
  useEffect(() => {
    async function fetchDebate() {
      setLoadingStep(0) // Initiating debate
      try {
        setLoadingStep(1) // Cooking the script
        const res = await generate_script_gemini(topic, figure1, figure2)
        setDebateData(res as unknown as DebateScript)
        setLoadingStep(2) // Generating images
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
          const images: GeneratedImageB64[] = await Promise.all(
            debateData.debate.map(async (round) => {
              const result = await get_img_ai_panel(
                round.name,
                round.description
              )
              // Ensure result is always treated as GeneratedImageURL
              if (typeof result === 'string') {
                return { image: result, cost: 0 } // Convert string to object
              }
              return result // Otherwise, assume it's already { cost, image }
            })
          )
          setRoundImages(images) // Correctly assign the array without type errors
          setLoadingStep(3) // Finalizing
        } catch (e: unknown) {
          console.error('Error fetching round images', e)
          // In case of error, use fallback images for missing rounds
          setRoundImages(
            debateData.debate.map(() => ({ cost: 0, image: fallbackImage }))
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

    setLoading(true)
    toast.info('Uploading images ...')
    const [figure1ImageUrl, figure2ImageUrl, roundImagesUrls] =
      await Promise.all([
        uploadToCloudinary(
          `data:image/jpeg;base64,${figure1Image}`,
          'unsigned_preset'
        ),
        uploadToCloudinary(
          `data:image/jpeg;base64,${figure2Image}`,
          'unsigned_preset'
        ),
        Promise.all(
          roundImages.map(async (round) => {
            return await uploadToCloudinary(
              `data:image/jpeg;base64,${round.image}`,
              'unsigned_preset'
            )
          })
        ),
      ])

    // Buat objek hasil penggabungan
    const finalData = {
      topic: topic,
      figure_1_name: figure1,
      figure_1_image_url: figure1ImageUrl,
      figure_2_name: figure2,
      figure_2_image_url: figure2ImageUrl,
      debate_dialogue: debateData?.debate.map((round, index) => [
        round.name,
        round.message,
        roundImagesUrls[index],
      ]),
    }

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
      toast.error('Failed to add new session!')
    } finally {
      setLoading(false)
    }
    setLoading(false)
  }

  const loadingStates = [
    { text: 'Initiating debate...' },
    { text: 'Cooking the script...' },
    { text: 'Generating images...' },
    { text: 'Finalizing...' },
  ]

  useEffect(() => {
    if (searchParams.toString().includes('account_id')) {
      router.push('/archives')
    }
  }, [searchParams])

  // Early returns for loading or error
  if (isLoading) {
    return (
      <div className="bg-white">
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={true}
          duration={5000}
          loop={false}
        />
      </div>
    )
  }
  if (error) {
    return (
      <div className="h-screen w-full grid place-items-center">{error}</div>
    )
  }
  if (!debateData || roundImages.length !== debateData.debate.length) {
    return (
      <div className="h-screen w-full grid place-items-center">
        Preparing debate rounds...
      </div>
    )
  }

  const currentRound = debateData.debate[currentStep]
  const currentImage = roundImages[currentStep]?.image ?? fallbackImage

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
      <img
        src={
          currentImage === fallbackImage
            ? fallbackImage
            : `data:image/jpeg;base64,${currentImage}`
        }
        alt="Debate Round"
        className="w-full h-full absolute object-cover"
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
        isPublishLoading={isLoading}
      />
    </div>
  )
}
