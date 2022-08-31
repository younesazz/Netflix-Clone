import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  import toast, { Toaster } from 'react-hot-toast'

  import { useRouter } from 'next/router'
  import { createContext, useContext, useEffect, useMemo, useState } from 'react'
  import { auth } from '../firebase'
  
  interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
  }
  
  const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
  })
  
  interface AuthProviderProps {
    children: React.ReactNode
  }
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    const toastStyle = {
      background: 'red',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      padding: '15px',
      borderRadius: '10px',
      maxWidth: '1000px',
    }

    const errorFunction = async () => {
     
        toast(
          `Login Failed`,
          {
            duration: 4000,
            style: toastStyle,
          }
        )
      
    }
  
    useEffect(
      () =>
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // Logged in...
            setUser(user)
            setLoading(false)
          } else {
            // Not logged in...
            setUser(null)
            setLoading(true)
            router.push('/login')
          }
  
          setInitialLoading(false)
        }),
      [auth]
    )
  
    const signUp = async (email: string, password: string) => {
      setLoading(true)
  
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user)
          router.push('/')
          setLoading(false)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }
  
    const signIn = async (email: string, password: string) => {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user)
          router.push('/')
          setLoading(false)
        })
        .catch((error) => errorFunction())
        .finally(() => setLoading(false))
    }
  
    const logout = async () => {
      setLoading(true)
  
      signOut(auth)
        .then(() => {
          setUser(null)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }
  
    const memoedValue = useMemo(
      () => ({ user, signUp, signIn, error, loading, logout }),
      [user, loading, error]
    )
  
    return (
      <AuthContext.Provider value={memoedValue}>
        <Toaster position="top-center" />
        {!initialLoading && children}
      </AuthContext.Provider>
    
    )
  }
  
  // Let's only export the `useAuth` hook instead of the context.
  // We only want to use the hook directly and never the context comopnent.
  export default function useAuth() {
    return useContext(AuthContext)
  }