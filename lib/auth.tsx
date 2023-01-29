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
import Cookies from 'js-cookie'
import { createUser } from './db'
import { Cookie } from './enums'

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

  const handleUser = async (rawUser: User | null) => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { accessToken, ...userWithoutToken } = user
      createUser(user.uid, userWithoutToken)
      setUser(user)

      Cookies.set(Cookie.IS_LOGGED_IN, '1', {
        expires: 1
      })
      return user
    } else {
      setUser(null)
      Cookies.remove(Cookie.IS_LOGGED_IN)
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

async function formatUser(user: User): Promise<UserState> {
  const accessToken = await user.getIdToken()
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    accessToken
  }
}
