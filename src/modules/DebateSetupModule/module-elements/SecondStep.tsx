import type React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Zap, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SecondStepProps {
  topic: string
  setTopic: (value: string) => void
  handleBack: () => void
  topicSuggestions: string[]
}

export const SecondStep: React.FC<SecondStepProps> = ({
  topic,
  setTopic,
  handleBack,
  topicSuggestions,
}) => {
  const router = useRouter()
  const initiateDebate = () => {
    router.push('/debate')
  }
  return (
    <>
      <div className="space-y-4">
        <Label htmlFor="topic">Debate Topic</Label>
        <Input
          id="topic"
          placeholder="Enter the debate topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-blue-900/30 border-blue-700/50 text-blue-100 placeholder-blue-300"
        />
        <div className="mt-4">
          <p className="text-blue-300 mb-2 flex items-center">
            <Lightbulb className="mr-2 h-4 w-4" />
            No idea? Try one of these topics:
          </p>
          <div className="flex flex-wrap gap-2">
            {topicSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTopic(suggestion)}
                className="bg-blue-900/30 border-blue-700/50 text-blue-100 hover:bg-blue-800/50"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between space-x-4">
        <Button
          type="button"
          onClick={handleBack}
          className="w-1/2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 hover:shadow-neon"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 hover:shadow-neon"
          disabled={!topic}
          onClick={initiateDebate}
        >
          Initiate AI Debate
          <Zap className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
