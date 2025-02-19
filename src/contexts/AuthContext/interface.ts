import { type ReactNode } from 'react'
import { type CustomFetchBaseResponse } from '@/utils/customFetch/interface'

export interface AuthContextProviderProps {
  children: ReactNode
}

export type AuthContextInterface = object

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
