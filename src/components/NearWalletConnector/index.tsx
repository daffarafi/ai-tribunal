'use client'

import { useBitteWallet } from '@mintbase-js/react'
import { Button } from '@/components/ui/button'

export const NearWalletConnector = () => {
  const { connect, disconnect, activeAccountId, isConnected } = useBitteWallet()

  if (!isConnected) {
    return (
      <div className="justify-self-end">
        <Button onClick={connect}> Connectx To NEAR </Button>
      </div>
    )
  }

  return (
    <div className="w-min  flex  justify-center items-center gap-3 justify-self-end">
      <p className="text-xs whitespace-nowrap">
        You are connected as <b>{activeAccountId}</b>
      </p>
      <div className="flex justify-center items-center ">
        <Button onClick={disconnect}> Disconnect</Button>
      </div>
    </div>
  )
}
