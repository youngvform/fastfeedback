import Head from 'next/head'
import { Button, Code, Heading, Text } from '@chakra-ui/react'
import { useAuth } from '../lib/auth'

export default function Home() {
  const auth = useAuth()
  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <Text>
          <Code>{auth.user?.name}</Code>
        </Text>
        <div>
          {auth.user?.email ? (
            <>
              <div>{auth.user?.email}</div>
              <Button onClick={auth.signOutWithGithub}>Sign Out</Button>
            </>
          ) : (
            <Button onClick={auth.signInWithGithub}>Sign In</Button>
          )}
        </div>
      </main>
    </div>
  )
}
