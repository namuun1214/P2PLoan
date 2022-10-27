import type { NextPage } from 'next'
import Head from 'next/head'

import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  HStack,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useUser } from '../../config/common/firebase/firebase'
import { Header } from '../../components/layout/header'
import { AddIcon } from '../../components/icons/AddIcon'

const MyGroups: NextPage = () => {
  const { user } = useUser()
  // console.log(user)
  const groups = [
    {
      name: 'Гэр бүл',
      createdDate: '2022.09.10',
      balance: '500000',
      interestRate: '4',
      members: [
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
      ],
    },
    {
      name: 'Гэр бүл',
      createdDate: '2022.09.10',
      balance: '500000',
      interestRate: '4',
      members: [
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
        { name: 'hh', img: 'https://i.pravatar.cc/100?img=3' },
      ],
    },
  ]
  const router = useRouter()
  return (
    <Box>
      <Head>
        <title>Home</title>
        <meta name="description" content="This is RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <VStack p={8} gap={3} align="center">
          <Header isBack title="Групп" />
          <Flex w="full" alignItems="start">
            <Text variant="bodyBold">Миний группууд</Text>
          </Flex>
          {groups.map((el, index) => {
            return (
              <VStack
                border="1px solid gray"
                borderRadius="15px"
                w="full"
                p={5}
                onClick={() => {
                  router.push({
                    pathname: 'groupDetail',
                    query: {
                      name: el.name,
                      createdDate: el.createdDate,
                      balance: el.balance,
                      interestRate: el.interestRate,
                      members: el.members.map((item) => item.img),
                    },
                  })
                }}
                key={index}
              >
                <HStack justify="space-between" w="full">
                  <VStack alignItems="start">
                    <Text textAlign="start">{el.name}</Text>
                    <Text textAlign="start" variant="secondary">
                      {el.createdDate}
                    </Text>
                  </VStack>
                  <VStack alignItems="start">
                    <Text textAlign="end" variant="bodyBold" color="green.600">
                      {el.balance}₮
                    </Text>
                    <Text textAlign="start" variant="secondary">
                      Зээлийн хүү: {el.interestRate} %
                    </Text>
                  </VStack>
                </HStack>
                <HStack justify="space-between" w="full">
                  <VStack alignItems="start">
                    <Text textAlign="start" variant="secondary">
                      Хөрөнгө оруулалт: 10%
                    </Text>
                    <Text textAlign="start" variant="secondary">
                      Зээл: 7%
                    </Text>
                  </VStack>
                  <AvatarGroup size="md" max={2}>
                    {el.members?.map((user, index) => {
                      return <Avatar name={user.name} src={user.img} />
                    })}
                  </AvatarGroup>
                </HStack>
              </VStack>
            )
          })}
          <Flex
            align="center"
            justify="end"
            w="full"
            gap={3}
            onClick={() => {
              router.push('/group/createGroup')
            }}
          >
            <AddIcon />
            <Button variant="link">Шинэ групп үүсгэх</Button>
          </Flex>
        </VStack>
      </main>
    </Box>
  )
}

export default MyGroups
