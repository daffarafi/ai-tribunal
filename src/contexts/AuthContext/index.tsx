'use client'

import React, { createContext, useContext } from 'react'
import {
  type AuthContextInterface,
  type AuthContextProviderProps,
} from './interface'
import { BitteWalletContextProvider } from '@mintbase-js/react'
import { BitteWalletSetup } from '@/config/setup'
import '@near-wallet-selector/modal-ui/styles.css'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const contextValue = {}

  return (
    <AuthContext.Provider value={contextValue}>
      <BitteWalletContextProvider {...BitteWalletSetup} onlyBitteWallet>
        {children}
      </BitteWalletContextProvider>
    </AuthContext.Provider>
  )
}
