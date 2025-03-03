import Link from 'next/link'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-800/50 bg-gray-900 text-blue-100">
      <p className="text-xs text-blue-300">
        © 2025 AI-Tribunal. Open-source under the MIT License.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs text-blue-300 hover:text-blue-400 transition-colors"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs text-blue-300 hover:text-blue-400 transition-colors"
          href="#"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  )
}
