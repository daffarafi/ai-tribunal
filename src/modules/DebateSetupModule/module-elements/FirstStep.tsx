import type React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { SearchSelect } from './SearchSelect'
import { ArrowRight, Shuffle, Lightbulb } from 'lucide-react'

interface FirstStepProps {
  figure1: string
  figure2: string
  figure1Image: string
  figure2Image: string
  setFigure1: (value: string) => void
  setFigure2: (value: string) => void
  setFigure1Image: (value: string) => void
  setFigure2Image: (value: string) => void
  handleNext: () => void
  publicFigures: string[]
}

export const FirstStep: React.FC<FirstStepProps> = ({
  figure1,
  figure2,
  figure1Image,
  figure2Image,
  setFigure1,
  setFigure2,
  setFigure1Image,
  setFigure2Image,
  handleNext,
  publicFigures,
}) => {
  const handleSelectFigure = (
    figure: string,
    setFigure: (value: string) => void,
    setImage: (value: string) => void
  ) => {
    setFigure(figure)
    setImage(`/figures/${figure.toLowerCase().replace(' ', '-')}.webp`)
  }

  const handleRandomSelection = () => {
    const availableFigures = publicFigures.filter(
      (figure) => figure !== figure1 && figure !== figure2
    )
    const shuffled = availableFigures.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 2)

    handleSelectFigure(selected[0], setFigure1, setFigure1Image)
    handleSelectFigure(selected[1], setFigure2, setFigure2Image)
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
              <Image
                src={figure1Image || '/placeholder.png'}
                alt={figure1 || 'First AI Entity'}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <SearchSelect
            value={figure1}
            onChange={(value) =>
              handleSelectFigure(value, setFigure1, setFigure1Image)
            }
            placeholder="Choose first public figure"
            items={publicFigures}
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="figure2" className="text-lg text-center">
            Select Second AI Entity
          </Label>
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
              <Image
                src={figure2Image || '/placeholder.png'}
                alt={figure2 || 'Second AI Entity'}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <SearchSelect
            value={figure2}
            onChange={(value) =>
              handleSelectFigure(value, setFigure2, setFigure2Image)
            }
            placeholder="Choose second public figure"
            items={publicFigures}
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
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Random Selection
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
