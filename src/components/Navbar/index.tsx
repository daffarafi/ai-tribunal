'use client'

import { BrainCircuit } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useState, useEffect } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu'
import { NearWalletConnector } from '../NearWalletConnector'

export const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDebatePage, setIsDebatePage] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsDebatePage(pathname === '/debate')
  }, [pathname])

  const handleMouseEnter = () => {
    if (isDebatePage) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (isDebatePage) {
      setIsHovered(false)
    }
  }

  return (
    <NavigationMenu
      className="fixed z-20 text-blue-100 top-0 box-border w-full max-w-auto left-0 px-4 lg:px-6 h-16 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 border-b border-blue-800 w-full h-full absolute transition duration-300 ease-in-out ${
          isDebatePage && isHovered ? 'translate-y-0' : '-translate-y-20'
        }`}
      />
      <div className="container relative mx-auto grid grid-cols-3 items-center justify-between h-full">
        <Link className="flex items-center justify-center w-min" href="/">
          <BrainCircuit className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-2xl font-bold font-orbitron whitespace-nowrap">
            AI-Tribunal
          </span>
        </Link>
        <div
          className={`relative transition-transform duration-300 ease-in-out ${
            (isDebatePage && isHovered) || !isDebatePage
              ? 'translate-y-0'
              : '-translate-y-20'
          }`}
        >
          <NavigationMenuList className="gap-5 w-full">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    'text-sm font-medium hover:text-blue-400 transition-colors'
                  }
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/debate-setup" legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    'text-sm font-medium hover:text-blue-400 transition-colors'
                  }
                >
                  Debate
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/archives" legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    'text-sm font-medium hover:text-blue-400 transition-colors'
                  }
                >
                  Archives
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
        <div
          className={`transition-transform relative duration-300 ease-in-out ${
            (isDebatePage && isHovered) || !isDebatePage
              ? 'translate-y-0'
              : '-translate-y-20'
          }`}
        >
          <NearWalletConnector />
        </div>
      </div>
    </NavigationMenu>
  )
}
