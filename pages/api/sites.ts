import { getAllSites } from '@/lib/db-admin'
import { GetSitesResponse } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<GetSitesResponse | any>
) {
  const { sites, error } = await getAllSites()
  if (error) {
    return res.status(500).json({ error })
  }
  return res.status(200).json({ sites })
}
