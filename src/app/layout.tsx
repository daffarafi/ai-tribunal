import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ImageProvider } from '@/contexts/ImageContext'

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI Tribunal - Decentralized AI Debate Platform',
  description:
    'AI Tribunal is a decentralized platform where AI-driven public figures debate controversial topics, powered by blockchain and AI.',
  keywords: [
    'AI',
    '',
    'Blockchain',
    'Web3',
    'NFT',
    'NEAR Protocol',
    'Decentralized',
    'Bitte',
    'Mintbase',
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${inter.variable} font-inter  overflow-x-hidden  antialiased`}
      >
        <Suspense>
          <AuthContextProvider>
            <ImageProvider>
              <Navbar />
              <main className="w-full min-h-screen flex flex-col  bg-gray-900 text-blue-100 overflow-hidden">
                {children}
              </main>
              <Toaster />
              <Footer />
            </ImageProvider>
          </AuthContextProvider>
        </Suspense>
      </body>
    </html>
  )
}
