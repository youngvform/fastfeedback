import { getUid } from '@/lib/auth-admin'
import { getUserSites } from '@/lib/db-admin'
import { ErrorCode } from '@/lib/enums'
import { GetSitesResponse } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSitesResponse | any>
) {
  try {
    const uid = await getUid(req)
    const sites = await getUserSites(uid)
    return res.status(200).json({ sites })
  } catch (error) {
    if (error.message === ErrorCode.UNAUTHORIZED) {
      return res.status(401).json({ error: { code: error.message } })
    }
    return res.status(500).json({ error })
  }
}
