import { compareDesc, parseISO } from 'date-fns'
import { DocumentData } from 'firebase/firestore'
import { DBCollectionName } from './enums'
import db from './firebase-admin'
import { SavedFeedback, SavedSiteData } from './types'

export async function getAllSites() {
  try {
    const snapshot = await db.collection(DBCollectionName.SITES).get()
    const sites: DocumentData[] = []
    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() })
    })
    return { sites: sites as SavedSiteData[] }
  } catch (error) {
    return { error }
  }
}

export async function getAllFeedback(siteId: string) {
  try {
    const snapshot = await db
      .collection(DBCollectionName.FEEDBACK)
      .where('siteId', '==', siteId)
      .get()

    const feedback: DocumentData[] = []
    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() })
    })

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    )
    return { feedback: feedback as SavedFeedback[] }
  } catch (error) {
    return { error }
  }
}
