import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/lib/auth'
import theme from '@/styles/theme'
import Head from 'next/head'
import { css, Global } from '@emotion/react'

const GlobalStyle = () => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
