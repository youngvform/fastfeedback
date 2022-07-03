import { getSites } from '@/lib/db-admin'
import { DocumentData } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<DocumentData[]>
) {
  const sites = await getSites()
  return res.status(200).json(sites)
}
