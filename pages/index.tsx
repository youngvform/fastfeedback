import Head from 'next/head'
import { Button, Code, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'

export default function Home() {
  const auth = useAuth()
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Heading>Fast Feedback</Heading>
      <Text>
        <Code>{auth.user?.name}</Code>
      </Text>
      <div>
        {auth.user?.email ? (
          <>
            <Button onClick={auth.signOutWithGithub}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={auth.signInWithGithub}>Sign In</Button>
        )}
      </div>
    </Flex>
  )
}
