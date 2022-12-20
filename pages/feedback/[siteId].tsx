import Feedback from '@/components/Feedback'
import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import { SavedFeedback } from '@/lib/types'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'

interface Props {
  initialFeedback: SavedFeedback[]
}

export default function SiteFeedback({ initialFeedback }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form">
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input id="comment" placeholder="Leave a comment" />
          <Button mt={4} type="submit" fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {initialFeedback.map(({ id, author, text, createdAt }) => (
        <Feedback key={id} author={author} text={text} createdAt={createdAt} />
      ))}
    </Box>
  )
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
