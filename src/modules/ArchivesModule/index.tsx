'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Search,
  Timer,
  Trophy,
  ArrowRight,
  User,
  Loader,
  ThumbsUp,
} from 'lucide-react'
import { useWalletSelector } from '@near-wallet-selector/react-hook'
import { debateDeseralizer } from './deserializer'
import { HelloNearContract } from '@/config'
import { toast } from 'sonner'
import { DebateProps } from './interface'

export const ArchivesModule = () => {
  const { viewFunction } = useWalletSelector()

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [debates, setDebates] = useState<DebateProps[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
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

  const getDebates = useCallback(async () => {
    try {
      setIsLoading(true)
      const debates = await viewFunction({
        contractId: HelloNearContract,
        method: 'get_debates',
      })
      console.log('debate: ', debates)
      const deserializedDebates = (debates as any[]).map((session) =>
        debateDeseralizer(session)
      )
      console.log(deserializedDebates)
      setDebates(deserializedDebates.reverse())
    } catch (err) {
      console.log(err)
      toast.error('Failed to get debates!')
    } finally {
      setIsLoading(false)
    }
  }, [viewFunction])

  useEffect(() => {
    void getDebates()
  }, [getDebates])

  return (
    <div className="relative z-10 container mx-auto px-4 pb-8 pt-32">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            AI Tribunal Debates
          </h1>
          <p className="text-blue-200">
            Watch AI-powered debates between historical figures
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
            <Input
              placeholder="Search debates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-blue-900/30 border-blue-700/50 text-blue-100 placeholder-blue-300"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="flex justify-center w-full col-span-3 py-20">
              <Loader className="animate-spin" />
            </div>
          ) : (
            debates
              .filter((debate) =>
                debate.topic.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((debate) => (
                <Card
                  key={debate.id}
                  className="bg-blue-900/30 border-blue-700/50 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-blue-100 text-xl">
                        {debate.topic}
                      </CardTitle>
                      {getStatusBadge('Lupa')}
                    </div>
                    <CardDescription className="text-blue-300">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        Created by <strong>{debate.creator}</strong> •{' '}
                        {debate.createdAt.toLocaleDateString()}
                      </div>
                      <div className="mt-1"></div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
                          <Image
                            src={debate.figure1ImageUrl || '/placeholder.svg'}
                            alt={debate.figure1Name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <p className="font-orbitron text-white text-sm text-center">
                          {debate.figure1Name}
                        </p>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-blue-400" />
                          <span className="text-white">
                            {debate.figure1Votes}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-3">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
                          <Image
                            src={debate.figure2ImageUrl || '/placeholder.svg'}
                            alt={debate.figure2Name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <p className="font-orbitron text-white text-sm text-center">
                          {debate.figure2Name}
                        </p>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-blue-400" />
                          <span className="text-white">
                            {debate.figure2Votes}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-blue-900/30 hover:bg-blue-800/50 hover:text-purple-300 border-blue-700/50 text-blue-100"
                      asChild
                    >
                      <Link href={`/archives/${debate.id}`}>
                        See Detail
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      </div>
    </div>
  )
}
