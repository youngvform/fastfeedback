import type { NextApiRequest } from 'next'
import { ErrorCode } from './enums'
import { auth } from './firebase-admin'

export async function getUid(req: NextApiRequest) {
  const token =
    req.headers.authorization?.split('Bearer ')[1] ?? req.cookies.access_token
  if (!token) {
    throw new Error(ErrorCode.UNAUTHORIZED)
  }
  const { uid } = await auth.verifyIdToken(token)
  return uid
}
