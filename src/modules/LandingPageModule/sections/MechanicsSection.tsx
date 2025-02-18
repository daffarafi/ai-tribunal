import { Brain, Cpu, Network } from 'lucide-react'
import React from 'react'

export const MechanicsSection: React.FC = () => {
  return (
    <section className="relative container mx-auto py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 font-orbitron text-blue-300">
          Quantum Debate Mechanics
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 p-6 bg-blue-900/30 rounded-lg backdrop-blur-sm border border-blue-700/50 transform transition-all hover:scale-105 hover:shadow-neon">
            <Cpu className="h-12 w-12 mb-2 text-blue-400" />
            <h3 className="text-xl font-bold font-orbitron">
              Select AI Entities
            </h3>
            <p className="text-sm text-blue-200 text-center">
              Choose any two AI-simulated public figures for your debate.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-6 bg-purple-900/30 rounded-lg backdrop-blur-sm border border-purple-700/50 transform transition-all hover:scale-105 hover:shadow-neon">
            <Network className="h-12 w-12 mb-2 text-purple-400" />
            <h3 className="text-xl font-bold font-orbitron">
              Neural Battleground
            </h3>
            <p className="text-sm text-blue-200 text-center">
              Set any topic for the AI entities to debate and analyze.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-6 bg-pink-900/30 rounded-lg backdrop-blur-sm border border-pink-700/50 transform transition-all hover:scale-105 hover:shadow-neon">
            <Brain className="h-12 w-12 mb-2 text-pink-400" />
            <h3 className="text-xl font-bold font-orbitron">
              Quantum Judgment
            </h3>
            <p className="text-sm text-blue-200 text-center">
              Observe the debate and cast your vote for the superior AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
