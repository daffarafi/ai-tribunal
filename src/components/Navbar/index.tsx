import { Brain } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu'

export const Navbar: React.FC = () => {
  return (
    <NavigationMenu className="absolute text-blue-100 top-0 box-border w-full max-w-auto left-0 px-4 lg:px-6 h-16 border-b border-blue-800/50">
      <div className="container mx-auto flex justify-between ">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-2xl font-bold font-orbitron">
            AI-Tribunal
          </span>
        </Link>
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  '"text-sm font-medium hover:text-blue-400 transition-colors" '
                }
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  '"text-sm font-medium hover:text-blue-400 transition-colors" '
                }
              >
                Debate
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  )
}
