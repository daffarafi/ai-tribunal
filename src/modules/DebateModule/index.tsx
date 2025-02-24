'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import create_debate_script from '@/lib/DeepSeekAI'
import { DebateScript } from '@/lib/interface'

export const DebateModule = () => {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isDebateFinished, setIsDebateFinished] = useState<boolean>(false)
  const [displayedText, setDisplayedText] = useState<string>('')
  const [typingIndex, setTypingIndex] = useState<number>(0)
  const [debateData, setDebateData] = useState<DebateScript>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const skipRef = useRef<boolean>(false)

  const figure1 = searchParams.get('figure1') ?? 'Alan Turing'
  const figure2 = searchParams.get('figure2') ?? 'Albert Einstein'
  const topic = searchParams.get('topic') ?? 'AI and its impact on society'
  const image1 = searchParams.get('image1') ?? '/figures/alan-turing.webp'
  const image2 = searchParams.get('image2') ?? '/figures/albert-einstein.webp'

  // Fetch debate script dynamically using async/await with error handling
  useEffect(() => {
    async function fetchDebate() {
      try {
        const res = await create_debate_script(topic, figure1, figure2)
        console.log(res)
        setDebateData(res)
        setError(null)
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error'
        setError(`Error fetching debate data: ${errorMessage}`)
      } finally {
        setIsLoading(false)
      }
    }
    void fetchDebate()
  }, [topic, figure1, figure2])

  //   // Map fetched debate rounds using static background images based on speaker:
  //   const debateScript = debateData.map((round) => ({
  //     speaker: round.name,
  //     text: round.message,
  //     background:
  //       round.name === figure1 ? '/debate/scene-1.webp' : '/debate/scene-2.webp',
  //   }))

  //   // Reset progress if debateScript changes
  //   useEffect(() => {
  //     setCurrentStep(0)
  //     setTypingIndex(0)
  //     setDisplayedText('')
  //     setIsDebateFinished(false)
  //   }, [debateScript])

  //   // Compute current round details and install typing effect hook (always called)
  //   const currentText = debateScript[currentStep]?.text || ''
  //   const currentSpeaker = debateScript[currentStep]?.speaker
  //   const currentImage = debateScript[currentStep]?.background

  //   useEffect(() => {
  //     if (typingIndex < currentText.length) {
  //       const timeout = setTimeout(
  //         () => {
  //           setDisplayedText((prev) => prev + currentText[typingIndex])
  //           setTypingIndex(typingIndex + 1)
  //         },
  //         skipRef.current ? 2 : 20
  //       )
  //       return () => clearTimeout(timeout)
  //     }
  //   }, [typingIndex, currentText])

  // Early returns for loading or error (after calling all hooks)
  if (isLoading) {
    return <p>Loading debate...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  //   const handleNext = () => {
  //     if (typingIndex < currentText.length) {
  //       skipRef.current = true
  //     } else if (currentStep < debateScript.length - 1) {
  //       skipRef.current = false
  //       setCurrentStep(currentStep + 1)
  //       setTypingIndex(0) // Reset typing index
  //       setDisplayedText('') // Reset displayed text
  //     } else {
  //       setIsDebateFinished(true)
  //     }
  //   }

  //   return (
  //     <div className="relative min-h-screen w-full overflow-hidden ">
  //       {/* Background Image */}
  //       <Image
  //         src={currentImage}
  //         alt="Courtroom"
  //         layout="fill"
  //         objectFit="cover"
  //       />

  //       {/* Debate Content */}
  //       <div className="absolute inset-0 flex flex-col justify-between ">
  //         <h1 className="text-4xl absolute top-4 left-[50%] -translate-x-[50%] font-bold text-center text-white mb-4 font-tech drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
  //           AI Debate: {topic}
  //         </h1>

  //         <div className="container absolute bottom-0 flex left-[50%] -translate-x-[50%] gap-8 items-end py-10">
  //           <div className="flex w-full justify-between items-end">
  //             {/* Text Box with Typing Effect */}
  //             <div className="w-full bg-black/70 rounded-lg p-6 min-h-[200px] border-4 border-blue-400">
  //               <h2 className="text-2xl font-bold text-blue-400 mb-4">
  //                 {currentSpeaker}
  //               </h2>
  //               <p className="text-xl text-white">
  //                 {isDebateFinished
  //                   ? 'The debate has concluded. Thank you for attending this AI showdown!'
  //                   : displayedText}
  //               </p>
  //             </div>
  //           </div>
  //           {/* Next Button */}
  //           <div className="flex justify-end w-40">
  //             <Button
  //               onClick={handleNext}
  //               disabled={isDebateFinished}
  //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 hover:shadow-neon flex items-center w-full"
  //             >
  //               {isDebateFinished
  //                 ? 'Debate Finished'
  //                 : typingIndex < currentText.length
  //                   ? 'Skip'
  //                   : 'Next'}
  //               <ArrowRight className="ml-2 h-4 w-4" />
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
}
