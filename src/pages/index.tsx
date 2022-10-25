import type { NextPage } from 'next'
import Head from 'next/head'

import { Box } from '@chakra-ui/react'
import SignUpPage from './login'
const SignIn: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Бүртгүүлэх хуудас</title>
        <meta name="description" content="This is RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SignUpPage />
      </main>
    </Box>
  )
}

export default SignIn
