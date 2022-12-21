import { getAllFeedback } from '@/lib/db-admin'
import { GetFeedbackResponse } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetFeedbackResponse | any>
) {
  const siteId = req.query.siteId
  const { feedback, error } = await getAllFeedback(siteId as string)

  if (error) {
    res.status(500).json({ error })
  } else {
    res.status(200).json({ feedback })
  }
}
