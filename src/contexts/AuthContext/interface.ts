import { type ReactNode } from 'react'
import { type CustomFetchBaseResponse } from '@/utils/customFetch/interface'

export interface AuthContextProviderProps {
  children: ReactNode
  user: User | null
}

export interface AuthContextInterface {
  user: User | null
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  validate: (params: { ticket: string }) => Promise<ValidateResponse>
  login: (params: { email: string }) => Promise<CustomFetchBaseResponse>
}

export interface User {
  id: string
}

export interface UserResponseInterface {
  user: User
}

export interface ValidateResponse extends CustomFetchBaseResponse {
  email: string
  accessToken: string
}
