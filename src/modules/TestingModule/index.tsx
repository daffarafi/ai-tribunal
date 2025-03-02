'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { get_img_ai } from '@/lib/GetImgAI'
import { get_img_ai_flux } from '@/lib/GetImgAI'
import {
  DebateScript,
  GeneratedImageB64,
  GeneratedImageURL,
} from '@/lib/interface'

const TestingModule = () => {
  const [imgData, setImgData] = useState<GeneratedImageURL | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchImage() {
      try {
        const data = await get_img_ai_flux('Hitler', 'Albert Einstein')
        if (
          typeof data === 'object' &&
          data !== null &&
          'cost' in data &&
          'url' in data
        ) {
          setImgData(data)
        } else {
          setError('Invalid data format received')
        }
        setError(null)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    void fetchImage()
  }, [])

  if (loading) return <p>Loading image...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Testing Module - Generated Image</h1>
      <p>Cost: {imgData?.cost}</p>
      {imgData?.url ? (
        <Image
          src={imgData.url}
          alt="Generated Testing Image"
          width={640}
          height={360}
        />
      ) : (
        <p>No image returned.</p>
      )}
      <h2>Decoded Base64 Preview (first 100 characters)</h2>
    </div>
  )
}

export default TestingModule
