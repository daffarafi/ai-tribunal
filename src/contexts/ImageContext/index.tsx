'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ImageContextType {
  figure1Image: string
  setFigure1Image: (image: string) => void
  figure2Image: string
  setFigure2Image: (image: string) => void
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [figure1Image, setFigure1Image] = useState('/placeholder.png')
  const [figure2Image, setFigure2Image] = useState('/placeholder.png')

  return (
    <ImageContext.Provider
      value={{ figure1Image, setFigure1Image, figure2Image, setFigure2Image }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export const useImageContext = () => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider')
  }
  return context
}
