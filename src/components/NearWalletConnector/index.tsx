'use client'

import { useWalletSelector } from '@near-wallet-selector/react-hook'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export const NearWalletConnector = () => {
  const { signedAccountId, signIn, signOut } = useWalletSelector()

  const [action, setAction] = useState<() => void>()
  const [label, setLabel] = useState('Loading...')

  useEffect(() => {
    if (signedAccountId) {
      setAction(() => signOut)
      setLabel(`Logout ${signedAccountId}`)
    } else {
      setAction(() => signIn)
      setLabel('Login')
    }
  }, [signedAccountId, signIn, signOut])

  return (
    <div className="w-min  flex  justify-center items-center gap-3 justify-self-end">
      <div className="flex justify-center items-center ">
        <Button
          variant={signedAccountId ? 'secondary' : 'default'}
          onClick={action}
        >
          {label}
        </Button>{' '}
      </div>
    </div>
  )
}
