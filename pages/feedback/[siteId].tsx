import React, { FormEvent, useRef, useState } from 'react'
import Feedback from '@/components/Feedback'
import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import { SavedFeedback, Feedback as FeedbackType } from '@/lib/types'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/router'
import { FeedbackStatus } from '@/lib/enums'
import { createFeedback } from '@/lib/db'

interface Props {
  initialFeedback: SavedFeedback[]
}

export default function SiteFeedback({ initialFeedback }: Props) {
  const auth = useAuth()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [feedback, setFeedback] = useState(initialFeedback)

  const onSubmit = (
    e: FormEvent<HTMLDivElement> & FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!auth.user) {
      alert('Something wrong...')
      return
    }
    const newFeedback: SavedFeedback = {
      id: auth.user.uid + new Date().toISOString(),
      author: auth.user?.name!,
      authorId: auth.user?.uid,
      siteId: router.query.siteId as string,
      text: inputRef.current?.value!,
      createdAt: new Date().toISOString(),
      provider: auth.user?.provider,
      status: FeedbackStatus.PENDING
    }

    console.log(`yoyoyoyoyo [siteId]: newFeedback `, newFeedback)

    setFeedback([newFeedback, ...feedback])
    createFeedback(newFeedback)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputRef} id="comment" placeholder="Leave a comment" />
          <Button mt={4} type="submit" fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {feedback.map(({ id, author, text, createdAt }) => (
        <Feedback key={id} author={author} text={text} createdAt={createdAt} />
      ))}
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { sites, error } = await getAllSites()
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
  const { feedback, error } = await getAllFeedback(siteId)

  return {
    // Passed to the page component as props
    props: { initialFeedback: feedback }
  }
}
