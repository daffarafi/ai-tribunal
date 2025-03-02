'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Download, MessageCircle, Play, Share, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DebateResult {
  topic: string
  figure1Name: string
  figure1ImageUrl: string
  figure2Name: string
  figure2ImageUrl: string
  dialogue: [string, string][]
  handleReplay: () => void
  isShowing: boolean
  setIsShowing: (isShowing: boolean) => void
  publishDebate: () => void
}

export const DebateResult: React.FC<DebateResult> = ({
  topic,
  figure1Name,
  figure1ImageUrl,
  figure2Name,
  figure2ImageUrl,
  dialogue,
  handleReplay,
  isShowing,
  setIsShowing,
  publishDebate,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <div
        className={`absolute duration-700 transition-all ${isShowing ? 'translate-y-0' : 'translate-y-full'} bg-black/70 max-w-full left-0 top-0 h-full container mx-auto px-4 pt-28`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {topic}
              </h1>
              <div className="flex items-center gap-4">
                {/* {getStatusBadge(debateData.category)} */}

                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <MessageCircle className="w-4 h-4" />
                  {dialogue.length} Dialogues
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {[
              {
                name: figure1Name,
                image: figure1ImageUrl,
              },
              {
                name: figure2Name,
                image: figure2ImageUrl,
              },
            ].map((figure) => (
              <div
                key={figure.name}
                className="flex flex-col items-center space-y-4"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
                  <Image
                    src={figure.image || '/placeholder.svg'}
                    alt={figure.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="text-xl font-orbitron">{figure.name}</h2>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6 mb-4">
            <div className="flex justify-between mb-3">
              <div className="flex gap-2 justify-between items-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsShowing(false)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="mr-2 h-4 w-4" />
                  Close Result
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReplay}
                  className="border-blue-400 text-blue-400 hover:bg-blue-900/50 hover:text-blue-100"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Replay Debate
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex justify-between items-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={publishDebate}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Publish Debate
                </Button>
              </div>
            </div>
            <div className="space-y-4 max-h-[30vh] overflow-y-auto mb-2">
              {dialogue.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex gap-4 transition-all duration-300',
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  )}
                >
                  <div className="flex-shrink-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blue-900/30 border border-blue-400">
                      <Image
                        src={
                          index % 2 === 0 ? figure1ImageUrl : figure2ImageUrl
                        }
                        alt={msg[0]}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div className=" bg-blue-900 rounded-lg p-4 w-content">
                    <div className="flex items-center gap-2 mb-2 w-content">
                      <span
                        className={`font-orbitron text-sm ${index % 2 === 0 ? 'text-start' : 'text-end'} w-full text-blue-300`}
                      >
                        {msg[0]}
                      </span>
                    </div>
                    <p className="text-sm w-content">{msg[1]}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex justify-center gap-5 items-center"></div>
          </div>
        </div>
      </div>
    </>
  )
}
