import type { NextPage } from 'next'
import Head from 'next/head'

import {
  Box,
  Button,
  VStack,
  Text,
  HStack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useTab,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { Header } from '../../components/layout/header'
import React from 'react'
import { GeneralTab } from '../../components/groups/GeneralTab'
import { TransactionTab } from '../../components/groups/TransactionTab'

const GroupDetail: NextPage = () => {
  // const { user } = useUser()
  // console.log(user)
  const { logout } = useAuth()
  const router = useRouter()
  const { name, members, balance, interestRate } = router.query

  const CustomTab = React.forwardRef((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig('Tabs', tabProps)

    return (
      <Button __css={styles.tab} {...tabProps} borderRadius="full">
        {tabProps.children}
      </Button>
    )
  })
  return (
    <Box>
      <Head>
        <title>Group Detail</title>
        <meta name="description" content="This is RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box p={8}>
          <Header isBack title="Дэлгэрэнгүй" hasCloseButton />
          <VStack w="full" gap={5}>
            <Text>{name}</Text>
            <Text variant="heading1">{balance}₮</Text>
            <HStack justify="space-between" w="full">
              <Text variant="secondary">
                Хэмжээ: <span style={{ fontWeight: '800' }}>1'500'000₮</span>{' '}
              </Text>
              <Text variant="secondary">
                Зээлийн хүү:{' '}
                <span style={{ fontWeight: '800' }}>{interestRate}%</span>{' '}
              </Text>
            </HStack>
            <Tabs w="full">
              <TabList
                w="full"
                justifyContent="space-around"
                border="none"
                py={5}
              >
                <CustomTab>Ерөнхий</CustomTab>
                <CustomTab>Гүйлгээ</CustomTab>
                <CustomTab>Статистик</CustomTab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <GeneralTab members={members} />
                </TabPanel>
                <TabPanel>
                  <VStack w="full" gap={5}>
                    <Text variant="bodyBold">Гүйлгээний жагсаалт</Text>
                    <TransactionTab />
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <Text variant="bodyBold">Удахгүй хийнэ дээ</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <HStack justify="space-around" w="full">
              <Button
                variant="solid"
                bgColor="#F5B544"
                flex={1}
                onClick={() => router.push('addFund')}
              >
                ХӨРӨНГӨ ОРУУЛАХ
              </Button>
              <Button
                variant="solid"
                bgColor="#2772F0"
                flex={1}
                onClick={() => router.push('borrowFund')}
              >
                ЗЭЭЛЭХ
              </Button>
            </HStack>
          </VStack>
        </Box>
      </main>
    </Box>
  )
}

export default GroupDetail
