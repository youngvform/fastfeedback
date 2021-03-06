import { DocumentData } from 'firebase/firestore'
import db from './firebase-admin'

export async function getSites() {
  const snapshot = await db.collection('sites').get()
  const sites: DocumentData[] = []
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })
  return sites
}
