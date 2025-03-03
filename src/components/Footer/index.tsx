import React from 'react'
import { Github } from './GIthub'

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10  py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-800/50 bg-gray-900 text-blue-100">
      <div className="container flex flex-col gap-2 sm:flex-row mx-auto items-center text-center">
        <p className="text-xs text-blue-300">
          © 2025 AI-Tribunal. Open-source under the MIT License.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            href="https://github.com/daffarafi"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition underline flex items-center gap-2"
          >
            <Github
              fill="fill-gray-300 group-hover:fill-white "
              size="w-4 h-4"
            />
            <span className="text-xs group-hover:text-white">
              M. Daffa&apos;I Rafi .P
            </span>
          </a>
          <a
            href="https://github.com/m-azzam-azis"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition underline flex items-center gap-2"
          >
            <Github
              fill="fill-gray-300 group-hover:fill-white "
              size="w-4 h-4"
            />
            <span className="text-xs group-hover:text-white">M. Azzam</span>
          </a>
          <a
            href="https://github.com/nabeel1209"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition underline flex items-center gap-2"
          >
            <Github
              fill="fill-gray-300 group-hover:fill-white "
              size="w-4 h-4"
            />
            <span className="text-xs group-hover:text-white">
              Nabeel Muhammad
            </span>
          </a>
        </nav>
      </div>
    </footer>
  )
}
