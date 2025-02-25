'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Timer,
  Trophy,
  ArrowRight,
  User,
  MessageCircle,
  ThumbsUp,
  Play,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useWalletSelector } from '@near-wallet-selector/react-hook'
import { HelloNearContract } from '@/config'
import { toast } from 'sonner'
import { debateDeseralizer } from './deserializer'
import { DebateDataProps } from './interface'

// Mock debate data
const debateDataConst = {
  id: 1,
  topic: 'The Future of Artificial Intelligence',
  figure1: {
    name: 'Alan Turing',
    image: '/figures/alan-turing.webp',
    votes: 156,
  },
  figure2: {
    name: 'Albert Einstein',
    image: '/figures/albert-einstein.webp',
    votes: 142,
  },
  category: 'Technology',
  createdAt: '2024-02-20T10:00:00Z',
  creator: {
    name: 'John Smith',
    image: '/placeholder.svg',
  },
  conversation: [
    {
      speaker: 'Alan Turing',
      message:
        "The advancement of AI technology is crucial for humanity's progress.",
      background: '/debate/scene-1.webp',
    },
    {
      speaker: 'Albert Einstein',
      message:
        'While AI has potential, we must consider the ethical implications and potential job displacement.',
      background: '/debate/scene-2.webp',
    },
    {
      speaker: 'Alan Turing',
      message:
        'AI can create new job opportunities and solve complex problems beyond human capabilities.',
      background: '/debate/scene-3.webp',
    },
    {
      speaker: 'Albert Einstein',
      message:
        'But we must ensure AI development is regulated to prevent misuse and protect privacy.',
      background: '/debate/scene-4.webp',
    },
    {
      speaker: 'Alan Turing',
      message:
        'Regulation is important, but overly strict rules could hinder innovation and scientific progress.',
      background: '/debate/scene-5.webp',
    },
    {
      speaker: 'Albert Einstein',
      message:
        'We need a balance between innovation and ethical considerations to ensure AI benefits all of humanity.',
      background: '/debate/scene-6.webp',
    },
  ],
}

export const ArchiveDetailModule = ({ debateId }: { debateId: number }) => {
  const { signedAccountId, callFunction, viewFunction } = useWalletSelector()
  const router = useRouter()

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showAll, setShowAll] = useState<boolean>(false)
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [debateData, setDebateData] = useState<null | DebateDataProps>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getDetailDebate = useCallback(async () => {
    try {
      setIsLoading(true)
      const debate = await viewFunction({
        contractId: HelloNearContract,
        method: 'get_detail_debate',
        args: {
          debate_id: debateId,
        },
      })
      console.log(debate)
      const deserializedDebates = debateDeseralizer(debate as any[])
      console.log(deserializedDebates)
      setDebateData(deserializedDebates)
    } catch (err) {
      console.log(err)
      toast.error('Failed to get debate!')
    } finally {
      setIsLoading(false)
    }
  }, [viewFunction])

  const vote = async (choice: 1 | 2) => {
    try {
      void callFunction({
        contractId: HelloNearContract,
        method: 'vote_debate',
        args: { debate_id: debateId, choice },
      })
      await new Promise((resolve) => setTimeout(resolve, 300))
      toast.error('Vote success!')
    } catch (err) {
      console.log(err)
      toast.error('Failed to vote!')
    }
  }

  const handleNext = () => {
    if (!!debateData) {
      if (currentIndex < debateData.dialogue.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
      if (currentIndex + 1 === debateData.dialogue.length - 1) {
        setShowAll(true)
      }
    }
  }

  const handleShowAll = () => {
    if (!!debateData) {
      setShowAll(true)
      setCurrentIndex(debateData.dialogue.length - 1)
    }
  }

  const handleReplay = () => {
    router.push('/debate')
  }

  const handleVote = (figure: string) => {
    if (votedFor) return
  }

  const getStatusBadge = (category: string) => {
    switch (category) {
      case 'Politic':
        return (
          <Badge className="bg-orange-500/20 text-orange-500 hover:bg-orange-500/30">
            <Timer className="w-3 h-3 mr-1" />
            Politic
          </Badge>
        )
      case 'Technology':
        return (
          <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
            <Trophy className="w-3 h-3 mr-1" />
            Technology
          </Badge>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentIndex])

  useEffect(() => {
    void getDetailDebate()
  }, [getDetailDebate])

  return (
    <div className="min-h-screen bg-gray-900 text-blue-100">
      {isLoading && !debateData ? (
        <></>
      ) : !debateData ? (
        <></>
      ) : (
        <>
          <div className="w-full h-full flex opacity-10 absolute top-0 left-0">
            <div className="w-full h-full relative">
              <Image
                src={debateData.dialogue[0]?.imageUrl || ''}
                alt="Courtroom"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-10 h-full bg-white" />
            <div className="w-full h-full relative">
              <Image
                src={debateData.dialogue[1]?.imageUrl || ''}
                alt="Courtroom"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="relative  container mx-auto px-4 pt-20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {debateData.topic}
                  </h1>
                  <div className="flex items-center gap-4">
                    {/* {getStatusBadge(debateData.category)} */}
                    <div className="flex items-center gap-2 text-sm text-blue-300">
                      <User className="w-4 h-4" />
                      Created by {debateData.creator}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-300">
                      <MessageCircle className="w-4 h-4" />
                      {debateData.dialogue.length} Dialogues
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                {[
                  {
                    name: debateData.figure1Name,
                    image: debateData.figure1ImageUrl,
                    votes: debateData.figure1Votes,
                    key: 'figure1',
                  },
                  {
                    name: debateData.figure2Name,
                    image: debateData.figure2ImageUrl,
                    votes: debateData.figure2Votes,
                    key: 'figure2',
                  },
                ].map((figure, index) => (
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
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-blue-400" />
                        <span>{figure.votes}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          'w-32 bg-blue-900/30 hover:bg-blue-800/50',
                          votedFor === figure.key && 'bg-blue-500 text-white'
                        )}
                        onClick={() => vote((index + 1) as 1 | 2)}
                        disabled={!!votedFor}
                      >
                        Vote
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6 mb-4">
                <div className="flex mb-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReplay}
                    className="bg-blue-900/30 hover:bg-blue-800/50"
                  >
                    <Play />
                    Replay
                  </Button>
                </div>
                <div className="space-y-4 max-h-[30vh] overflow-y-auto mb-2">
                  {debateData.dialogue.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex gap-4 transition-all duration-300',
                        index > currentIndex && !showAll
                          ? 'opacity-0 h-0 overflow-hidden'
                          : 'opacity-100',
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      )}
                    >
                      <div className="flex-shrink-0">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blue-900/30 border border-blue-400">
                          <Image
                            src={
                              msg.name === debateData.figure1Name
                                ? debateData.figure1ImageUrl
                                : debateData.figure2ImageUrl
                            }
                            alt={msg.name}
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
                            {msg.name}
                          </span>
                        </div>
                        <p className="text-sm w-content">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="flex justify-center gap-5 items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShowAll}
                    className="bg-blue-900/30 hover:bg-blue-800/50"
                    disabled={showAll}
                  >
                    Show All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    className="bg-blue-900/30 hover:bg-blue-800/50"
                    disabled={
                      currentIndex >= debateData.dialogue.length - 1 || showAll
                    }
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
