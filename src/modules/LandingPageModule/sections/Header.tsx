import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="relative min-h-screen  container mx-auto py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Enter the AI-Tribunal
            </h1>
            <p className="mx-auto max-w-[700px] text-blue-200 md:text-xl">
              Witness the future of debate: AI-powered public figures clash on
              any topic. The verdict is in your hands.
            </p>
          </div>
          <Link href={'/debate-setup'}>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 hover:shadow-neon"
              size="lg"
            >
              Initiate Simulation
              <Zap className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
