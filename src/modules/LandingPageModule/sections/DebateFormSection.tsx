import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play } from 'lucide-react'

export const DebateFormSection: React.FC = () => {
  return (
    <section className="relative container mx-auto py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 font-orbitron text-blue-300">
          Access the Neural Network
        </h2>
        <div className="mx-auto max-w-sm space-y-4">
          <Input
            className="w-full bg-blue-900/30 border-blue-700/50 text-blue-100 placeholder-blue-300 backdrop-blur-sm"
            placeholder="First AI Entity"
          />
          <Input
            className="w-full bg-blue-900/30 border-blue-700/50 text-blue-100 placeholder-blue-300 backdrop-blur-sm"
            placeholder="Second AI Entity"
          />
          <Input
            className="w-full bg-blue-900/30 border-blue-700/50 text-blue-100 placeholder-blue-300 backdrop-blur-sm"
            placeholder="Debate Topic"
          />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 hover:shadow-neon"
            size="lg"
          >
            Launch Debate Simulation
            <Play className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
