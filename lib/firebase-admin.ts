import * as admin from 'firebase-admin'

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLEINT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://fast-feedback-demo-f5f40.firebaseio.com/'
  })
}

export default admin.firestore()
