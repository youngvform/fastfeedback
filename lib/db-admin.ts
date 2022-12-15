import { DocumentData } from 'firebase/firestore'
import { DBCollectionName } from './enums'
import db from './firebase-admin'
import { SavedFeedback, SavedSiteData } from './types'

export async function getAllSites() {
  const snapshot = await db.collection(DBCollectionName.SITES).get()
  const sites: DocumentData[] = []
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })
  return sites as SavedSiteData[]
}

export async function getAllFeedback(siteId: string) {
  const snapshot = await db
    .collection(DBCollectionName.FEEDBACK)
    .where('siteId', '==', siteId)
    .get()

  const feedback: DocumentData[] = []
  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() })
  })
  return feedback as SavedFeedback[]
}
