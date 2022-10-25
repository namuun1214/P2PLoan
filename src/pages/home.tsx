import type { NextPage } from 'next'
import Head from 'next/head'

import { Box, Button } from '@chakra-ui/react'
import SignUpPage from './signUpPage'
import { useUser } from '../config/common/firebase/firebase'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
const HomePage: NextPage = () => {
  // const { user } = useUser()
  // console.log(user)
  const { logout } = useAuth()
  const router = useRouter()
  return (
    <Box>
      <Head>
        <title>Home</title>
        <meta name="description" content="This is RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>Home</div>
        <Button
          onClick={() => {
            void logout()
            void router.push('/signUpPage')
          }}
        >
          Гарах
        </Button>
      </main>
    </Box>
  )
}

export default HomePage
