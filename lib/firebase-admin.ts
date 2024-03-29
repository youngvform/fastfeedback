import * as admin from 'firebase-admin'

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
        ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLEINT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://fast-feedback-demo-f5f40.firebaseio.com/'
  })
}

const auth = admin.auth()
const db = admin.firestore()

export { auth, db }
