import app from './firebase'
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore'
import { SiteData, UserState } from './types'

const db = getFirestore(app)

export async function createUser(uid: string, data: UserState) {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        ...data
      },
      { merge: true }
    )
  } catch (error) {
    console.error(`Error: adding document `, error)
  }
}

export async function createSite(data: SiteData) {
  try {
    await addDoc(collection(db, 'sites'), {
      ...data
    })
  } catch (error) {
    console.error(`Error: adding document `, error)
  }
}
