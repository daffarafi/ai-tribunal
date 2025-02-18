'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getCookie, setCookie } from 'cookies-next/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useBaseUrlWithPath } from '@/hooks/useBaseUrlWithPath'
import {
  UserResponseInterface,
  type AuthContextInterface,
  type AuthContextProviderProps,
  type User,
  type ValidateResponse,
} from './interface'
import { customFetch, customFetchBody } from '@/utils/customFetch'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  user: userFromServer,
  children,
}) => {
  const [user, setUser] = useState<null | User>(userFromServer)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const developmentLock = useRef(false)
  const fullUrl = useBaseUrlWithPath()
  const pathname = usePathname()

  const validate = async ({ ticket }: { ticket: string }) => {
    try {
      const response = await customFetch<ValidateResponse>(
        `/validate/${ticket}`,
        { method: 'POST' }
      )

      if (response.statusCode !== 200) throw new Error(response.message)

      setCookie('AT', response.accessToken)
      setIsAuthenticated(true)
      const responseUser = await customFetch<UserResponseInterface>('/user', {
        isAuthorized: true,
      })

      if (responseUser.statusCode !== 200) throw new Error(responseUser.message)

      setUser(responseUser.user)
      router.replace(pathname)
      router.refresh()
      return response
    } catch (e) {
      setUser(null)
      setIsAuthenticated(false)
      router.replace(pathname)
      router.refresh()
      if (e instanceof Error) throw new Error(e.message)
      throw new Error('Unexpected error')
    }
  }

  const login = async ({ email }: { email: string }) => {
    const response = await customFetch('/login', {
      method: 'POST',
      body: customFetchBody({ email }),
    })

    if (response.statusCode === 200) {
      return response
    } else {
      throw new Error(response.message)
    }
  }

  useEffect(() => {
    const accessToken = getCookie('AT')
    setIsAuthenticated(!!accessToken)
    if (!developmentLock.current || process.env.NODE_ENV === 'production') {
      if (searchParams.toString().includes('ticket') && !!fullUrl) {
        const ticket = searchParams.get('ticket')
        toast.promise(validate({ ticket: ticket! }), {
          loading: 'Logging in...',
          success: () => {
            router.refresh()
            return 'Login berhasil!'
          },
          error: (err: Error) => `Oops. Login gagal! ${err.message}`,
        })
      }
    }

    return () => {
      if (process.env.NODE_ENV !== 'production' && !!fullUrl) {
        developmentLock.current = true
      }
    }
  }, [searchParams, fullUrl])

  const contextValue = {
    user,
    isAuthenticated,
    setIsAuthenticated,
    validate,
    login,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
