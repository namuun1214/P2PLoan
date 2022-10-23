import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'
const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>RPayG</title>
        <meta name="description" content="This is RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href={`rooms/${12}`}>Room 12</Link>
      </main>
    </Box>
  )
}

export default Home
