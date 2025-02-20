'use client'

import { useState } from 'react'
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
import { Search, Timer, Trophy, ArrowRight, User } from 'lucide-react'

// Mock data for debates
const debates = [
  {
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
  },
  {
    id: 2,
    topic: 'The Nature of Consciousness',
    figure1: {
      name: 'Stephen Hawking',
      image: '/figures/stephen-hawking.webp',
      votes: 89,
    },
    figure2: {
      name: 'Nikola Tesla',
      image: '/figures/nikola-tesla.webp',
      votes: 94,
    },
    category: 'Politic',
    createdAt: '2024-02-19T15:30:00Z',
    creator: {
      name: 'Jane Doe',
      image: '/placeholder.svg',
    },
  },
]

export const ArchivesModule = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

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
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] bg-blue-900/30 border-blue-700/50 text-blue-100">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Debates</SelectItem>
              <SelectItem value="Politic">Politic</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {debates.map((debate) => (
            <Card
              key={debate.id}
              className="bg-blue-900/30 border-blue-700/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-blue-100 text-xl">
                    {debate.topic}
                  </CardTitle>
                  {getStatusBadge(debate.category)}
                </div>
                <CardDescription className="text-blue-300">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Created by {debate.creator.name}
                  </div>
                  <div className="mt-1">
                    {new Date(debate.createdAt).toLocaleDateString()}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
                      <Image
                        src={debate.figure1.image || '/placeholder.svg'}
                        alt={debate.figure1.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="font-orbitron text-white text-sm text-center">
                      {debate.figure1.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-900/30 border-2 border-blue-400">
                      <Image
                        src={debate.figure2.image || '/placeholder.svg'}
                        alt={debate.figure2.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="font-orbitron text-white text-sm text-center">
                      {debate.figure2.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50 text-blue-100"
                  asChild
                >
                  <Link href={`/archives/${debate.id}`}>
                    See Detail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
