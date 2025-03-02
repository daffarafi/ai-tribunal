'use client'

import type React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { SearchSelect } from './SearchSelect'
import { ArrowRight, Shuffle, Lightbulb, Loader } from 'lucide-react'
import { useState } from 'react'
import { get_two_random_public_figures } from '@/lib/DeepSeekAI'
import { toast } from 'sonner'

interface FirstStepProps {
  figure1: string
  figure2: string
  figure1Image: string
  figure2Image: string
  setFigure1: (value: string) => void
  setFigure2: (value: string) => void

  handleNext: () => void
  publicFigures: string[]
  loadingPublicFigures: boolean
  searchPublicFigures?: (query: string) => Promise<void>
  loadingFirstImage: boolean
  loadingSecondImage: boolean
}

export const FirstStep: React.FC<FirstStepProps> = ({
  figure1,
  figure2,
  figure1Image,
  figure2Image,
  setFigure1,
  setFigure2,
  handleNext,
  publicFigures,
  loadingPublicFigures,
  searchPublicFigures,
  loadingFirstImage,
  loadingSecondImage,
}) => {
  const [searchingFigure1, setSearchingFigure1] = useState(false)
  const [searchingFigure2, setSearchingFigure2] = useState(false)
  const [loadingRandomSelection, setLoadingRandomSelection] = useState(false)
  const handleSelectFigure = (
    figure: string,
    setFigure: (value: string) => void
  ) => {
    setFigure(figure)
  }

  const handleRandomSelection = async () => {
    try {
      setLoadingRandomSelection(true)
      const res = await get_two_random_public_figures()

      handleSelectFigure(res[0], setFigure1)
      handleSelectFigure(res[1], setFigure2)
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'
      toast.error(`Error fetching random selection: ${errorMessage}`)
    } finally {
      setLoadingRandomSelection(false)
    }
  }

  const handleSearchFigure1 = async (query: string) => {
    if (searchPublicFigures && query.trim().length > 0) {
      setSearchingFigure1(true)
      try {
        await searchPublicFigures(query)
      } finally {
        setSearchingFigure1(false)
      }
    }
  }

  const handleSearchFigure2 = async (query: string) => {
    if (searchPublicFigures && query.trim().length > 0) {
      setSearchingFigure2(true)
      try {
        await searchPublicFigures(query)
      } finally {
        setSearchingFigure2(false)
      }
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="figure1" className="text-lg text-center">
            Select First AI Entity
          </Label>
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
              {loadingFirstImage ? (
                <div className="flex flex-col items-center gap-2 justify-center w-full h-full text-blue-400">
                  <Loader className="animate-spin" />
                  <span className="text-xs text-center">
                    {' '}
                    Generating image with AI...
                  </span>
                </div>
              ) : (
                <Image
                  src={figure1Image || '/placeholder.png'}
                  alt={figure1 || 'First AI Entity'}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>
          <SearchSelect
            value={figure1}
            onChange={(value) => handleSelectFigure(value, setFigure1)}
            placeholder="Choose first public figure"
            items={publicFigures}
            loading={loadingPublicFigures || searchingFigure1}
            onSearch={handleSearchFigure1}
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="figure2" className="text-lg text-center">
            Select Second AI Entity
          </Label>
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
              {loadingSecondImage ? (
                <div className="flex flex-col items-center gap-2 justify-center w-full h-full text-blue-400">
                  <Loader className="animate-spin" />
                  <span className="text-xs text-center">
                    {' '}
                    Generating image with AI...
                  </span>
                </div>
              ) : (
                <Image
                  src={figure2Image || '/placeholder.png'}
                  alt={figure2 || 'First AI Entity'}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>
          <SearchSelect
            value={figure2}
            onChange={(value) => handleSelectFigure(value, setFigure2)}
            placeholder="Choose second public figure"
            items={publicFigures}
            loading={loadingPublicFigures || searchingFigure2}
            onSearch={handleSearchFigure2}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-blue-300 mb-4 flex items-center">
          <Lightbulb className="mr-2 h-5 w-5" />
          Can&apos;t decide? Let fate choose your debaters!
        </p>
        <Button
          type="button"
          onClick={handleRandomSelection}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 hover:shadow-neon flex items-center"
          disabled={loadingRandomSelection}
        >
          {loadingRandomSelection ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Letting fate decide...
            </>
          ) : (
            <>
              <Shuffle className="mr-2 h-4 w-4" />
              Random Selection
            </>
          )}
        </Button>
      </div>

      <Button
        type="button"
        onClick={handleNext}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 hover:shadow-neon"
        disabled={!figure1 || !figure2}
      >
        Next Step
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </>
  )
}
