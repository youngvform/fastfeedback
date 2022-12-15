import { getAllFeedback } from '@/lib/db-admin'
import { GetFeedbackResponse } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetFeedbackResponse>
) {
  const siteId = req.query.siteId
  const feedback = await getAllFeedback(siteId as string)
  return res.status(200).json({ feedback })
}
