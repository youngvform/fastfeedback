import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import { SavedFeedback } from '@/lib/types'
import { GetStaticProps, GetStaticPaths } from 'next'

interface Props {
  initialFeedback: SavedFeedback[]
}

export default function SiteFeedback({ initialFeedback }: Props) {
  console.log(`yoyoyoyoyo [siteId]: initialFeedback `, initialFeedback)
  return initialFeedback.map((feedback) => JSON.stringify(feedback))
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sites = await getAllSites()
  // 각 path의 static page를 만들고 params를 getStaticProps에 넘겨줌
  return {
    paths: sites.map((site) => ({
      params: { siteId: site.id.toString() }
    })),
    fallback: false // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{}, { siteId: string }> = async ({
  params
}) => {
  const { siteId } = params!
  const feedback = await getAllFeedback(siteId)
  return {
    // Passed to the page component as props
    props: { initialFeedback: feedback }
  }
}
