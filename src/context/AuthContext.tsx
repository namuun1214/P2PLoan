import React, {
  createContext,
  useState,
  useEffect,
  FC,
  useContext,
  ReactElement,
} from 'react'
import { onAuthStateChanged, RecaptchaVerifier, User } from 'firebase/auth'
import { auth } from '../config/common/firebase/firebase'

type AuthContextType = {
  user?: User | null
  setUser: (props: User | undefined) => void
  loading: boolean
  logout?: () => Promise<void>
  hasUser?: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
  loading: false,
  hasUser: false,
})

export const AuthProvider: FC<{ children: ReactElement }> = (props) => {
  const { children } = props

  const [user, setUser] = useState<User | undefined>({})
  const [loading, setLoading] = useState(false)
  const [hasUser, setHasUser] = useState<boolean>(true)
  const logout = (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setUser({})
    return auth.signOut()
  }

  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        const UNDEFINED = undefined
        setUser(UNDEFINED)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [auth])
  useEffect(() => {
    console.log('hjhjh', user)
    if (user === undefined) {
      setHasUser(false)
    } else {
      setHasUser(true)
    }
  }, [user, loading])
  return (
    <AuthContext.Provider value={{ user, logout, loading, hasUser, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
