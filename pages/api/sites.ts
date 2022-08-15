import { getSites } from '@/lib/db-admin'
import { GetSitesResponse } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<GetSitesResponse>
) {
  const sites = await getSites()
  return res.status(200).json({ sites })
}
