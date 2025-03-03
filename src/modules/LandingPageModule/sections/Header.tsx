'use client'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Zap, ChevronDown, Info, HelpCircle, Users, Globe } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Interactive SVG background components
const CircuitPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full z-0 opacity-20"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10,30 L90,30"
      stroke="rgba(147, 197, 253, 0.5)"
      strokeWidth="0.5"
    />
    <path
      d="M10,50 L90,50"
      stroke="rgba(147, 197, 253, 0.5)"
      strokeWidth="0.5"
    />
    <path
      d="M10,70 L90,70"
      stroke="rgba(147, 197, 253, 0.5)"
      strokeWidth="0.5"
    />
    <path
      d="M30,10 L30,90"
      stroke="rgba(147, 197, 253, 0.5)"
      strokeWidth="0.5"
    />
    <path
      d="M50,10 L50,90"
      stroke="rgba(147, 197, 253, 0.5)"
      strokeWidth="0.5"
    />
    <path
      d="M70,10 L70,90"
      stroke="rgba(147, 197, 253, 0.5)"
      strokeWidth="0.5"
    />
    <circle cx="30" cy="30" r="2" fill="rgba(192, 132, 252, 0.8)" />
    <circle cx="50" cy="50" r="2" fill="rgba(192, 132, 252, 0.8)" />
    <circle cx="70" cy="70" r="2" fill="rgba(192, 132, 252, 0.8)" />
    <circle cx="30" cy="70" r="2" fill="rgba(192, 132, 252, 0.8)" />
    <circle cx="70" cy="30" r="2" fill="rgba(192, 132, 252, 0.8)" />
  </svg>
)

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30"
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
          }}
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          animate={{
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  )
}

const PulsatingRing = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <motion.div
      className="w-64 h-64 rounded-full border-2 border-purple-500 opacity-40"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.1, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>
)

export const HomePage = () => {
  // Scroll indicator state
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  // Use useLayoutEffect instead of useEffect for scroll handling
  useLayoutEffect(() => {
    // Set initial state based on scroll position
    setShowScrollIndicator(window.scrollY <= 100)

    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY <= 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <header className="relative min-h-screen container mx-auto py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
        <CircuitPattern />
        <FloatingOrbs />
        <PulsatingRing />

        <div className="px-4 md:px-6 z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Enter the AI-Tribunal
              </h1>
              <p className="mx-auto max-w-[700px] text-blue-200 md:text-xl">
                Where Legends Transcend Time, Debating Across Eras in a Clash of
                Minds! Take part and be the final jury!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href={'/debate-setup'}>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 hover:shadow-neon group"
                  size="lg"
                >
                  <span>Initiate Simulation</span>
                  <motion.div
                    className="ml-2 inline-flex"
                    animate={{ rotate: [0, 20, 0, -20, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          >
            <p className="text-blue-300 mb-2 text-sm">Scroll to discover</p>
            <ChevronDown className="h-6 w-6 text-blue-400" />
          </motion.div>
        )}
      </header>

      {/* What We Do Section */}
      <section className="py-16 bg-gradient-to-b from-black to-blue-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                What We Do
              </h2>
              <p className="max-w-2xl mx-auto text-blue-200">
                Our AI-Tribunal simulates hypothetical debates between
                historical figures, thinkers, and experts across time and
                disciplines.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 mb-4 text-purple-400" />,
                title: 'Historical Debates',
                description:
                  'Watch as historical figures debate contemporary issues, offering insights based on their philosophies and ideologies.',
              },
              {
                icon: <Globe className="h-10 w-10 mb-4 text-blue-400" />,
                title: 'Cross-Era Discussions',
                description:
                  'Experience impossible conversations between thought leaders separated by centuries who never could have met in real life.',
              },
              {
                icon: <Info className="h-10 w-10 mb-4 text-pink-400" />,
                title: 'Jury Participation',
                description:
                  'Cast your vote and influence the outcome of these simulated intellectual clashes as part of our virtual jury system.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-blue-950/40 border-blue-800 text-center h-full">
                  <CardHeader>
                    <div className="flex justify-center">{item.icon}</div>
                    <CardTitle className="text-xl text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-blue-200">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-blue-950 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Frequently Asked Questions
              </h2>
              <p className="max-w-2xl mx-auto text-blue-200">
                Everything you need to know about the AI-Tribunal experience
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: 'How accurate are these simulated debates?',
                  answer:
                    "Our AI models are trained on extensive historical texts, writings, and speeches to represent each figure's views as accurately as possible. However, these are simulations based on available information and should be viewed as educational entertainment rather than perfect historical recreations.",
                },
                {
                  question: 'Can I suggest debate topics or participants?',
                  answer:
                    "Absolutely! We welcome suggestions from our community. You can submit your ideas through the Debate Setup page, where you can propose historical figures and topics you'd like to see debated.",
                },
                {
                  question: 'How does the jury system work?',
                  answer:
                    "After watching a debate, you'll be invited to cast your vote for the most compelling arguments. Our system aggregates all viewer votes to determine the winner, creating a crowdsourced judgment on historical ideas in modern contexts.",
                },
                {
                  question:
                    'Are these debates recorded and available to watch later?',
                  answer:
                    'Yes, all debates are archived in our Debate Library, where you can access past simulations at any time. This growing collection serves as a unique educational resource exploring ideas across time.',
                },
                {
                  question: 'What technology powers the AI-Tribunal?',
                  answer:
                    'We utilize advanced large language models specifically fine-tuned on historical texts, philosophical works, and primary sources to create these simulations. Our proprietary system carefully balances historical accuracy with engaging presentation.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-blue-800 rounded-lg bg-blue-950/30 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:bg-blue-900/20 text-white text-left">
                      <div className="flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2 text-purple-400 flex-shrink-0" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-4 text-blue-200">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <CircuitPattern />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Ready to Witness History Collide?
            </h2>
            <p className="text-blue-200 mb-8">
              Join the AI-Tribunal today and experience debates that transcend
              time. Choose your historical figures, set the topic, and be part
              of the jury.
            </p>
            <Link href={'/debate-setup'}>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-neon"
                size="lg"
              >
                Create Your First Debate
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
