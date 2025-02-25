'use client'

import React, { createContext, useContext, useState } from 'react'
import {
  type AuthContextInterface,
  type AuthContextProviderProps,
} from './interface'

import '@near-wallet-selector/modal-ui/styles.css'
import { WalletSelector } from '@near-wallet-selector/core'
import { WalletSelectorProvider } from '@near-wallet-selector/react-hook'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet'
import { setupMeteorWalletApp } from '@near-wallet-selector/meteor-wallet-app'
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet'
import { setupHotWallet } from '@near-wallet-selector/hot-wallet'
import { setupLedger } from '@near-wallet-selector/ledger'
import { setupSender } from '@near-wallet-selector/sender'
import { setupHereWallet } from '@near-wallet-selector/here-wallet'
import { setupNearMobileWallet } from '@near-wallet-selector/near-mobile-wallet'
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet'
import { HelloNearContract, NetworkId } from '@/config'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [walletSelector, setWalletSelector] = useState<WalletSelector | null>(
    null
  )
  const network = NetworkId

  const walletSelectorConfig = {
    network: NetworkId,
    modules: [
      setupBitteWallet(),
      setupMeteorWallet(),
      setupMeteorWalletApp({ contractId: HelloNearContract }),
      setupHotWallet(),
      setupLedger(),
      setupSender(),
      setupHereWallet(),
      setupNearMobileWallet(),
      setupWelldoneWallet(),
      setupMyNearWallet(),
    ],
  }

  const contextValue = { walletSelector, setWalletSelector, network }

  return (
    <AuthContext.Provider value={contextValue}>
      <WalletSelectorProvider config={walletSelectorConfig as any}>
        {children}
      </WalletSelectorProvider>
    </AuthContext.Provider>
  )
}
