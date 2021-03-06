import type { ChildrenProps, UserState } from './types'
import './firebase'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { createUser } from './db'

const githubAuthProvider = new GithubAuthProvider()
const auth = getAuth()
const AuthContext = createContext<ReturnType<typeof useProvideAuth> | null>(
  null
)

export const AuthProvider: FC<ChildrenProps> = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error(`Can't get auth properly.`)
  return auth
}

function useProvideAuth() {
  const [user, setUser] = useState<UserState | null>(null)

  const handleUser = (rawUser: User | null) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      createUser(user.uid, user)
      setUser(user)
      return user
    } else {
      setUser(null)
      return null
    }
  }

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubAuthProvider)
      .then((result) => {
        // get github accessToken
        const credential = GithubAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        handleUser(result.user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error)
        // ...
      })
  }

  const signOutWithGithub = () => {
    return signOut(auth).then(() => handleUser(null))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser)
    return () => unsubscribe()
  }, [])

  return {
    user,
    signInWithGithub,
    signOutWithGithub
  }
}

function formatUser(user: User): UserState {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  }
}
