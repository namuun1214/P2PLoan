import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  VStack,
  Text,
  HStack,
  FormControl,
  FormLabel,
  Switch,
  Button,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { KhanBankLogo } from '../../components/icons'
import { MetaMaskLogo } from '../../components/icons/MetaMaskLogo'
import { Header } from '../../components/layout/header'
const AddFund: NextPage = () => {
  const [sliderValue, setSliderValue] = useState(50)
  const [isCrypto, setCrypto] = useState(false)
  const router = useRouter()
  const data = {
    totalAmount: 1500000,
    balance: 897500,
    selfRate: 0,
  }
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }
  return (
    <Box p={8}>
      <Header isBack title="Хөрөнгө оруулах" />
      <Box pt={6} gap={5}>
        <Slider
          aria-label="slider-ex-6"
          colorScheme="yellow"
          onChange={(val) => setSliderValue(val)}
        >
          <SliderMark value={25} {...labelStyles}>
            50'000
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            250'000
          </SliderMark>
          <SliderMark value={75} {...labelStyles}>
            500'000
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
          >
            {sliderValue * 5000}₮
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <VStack mt={10} align="start" gap={3}>
          <Text variant="bodyBold">Сангийн хэмжээ</Text>
          <HStack w="full" justify="space-around">
            <VStack>
              <Text variant="body">{data.totalAmount}₮</Text>
              <Text variant="caption" color="gray">
                Өмнө
              </Text>
            </VStack>
            <VStack>
              <Text variant="body">{sliderValue * 5000}₮</Text>
              <Text variant="caption" color="gray">
                Нэмсэн
              </Text>
            </VStack>
            <VStack>
              <Text variant="body">
                {data.totalAmount + sliderValue * 5000}₮
              </Text>
              <Text variant="caption" color="gray">
                Дараа
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack mt={10} align="start" gap={5}>
          <Text variant="bodyBold">Үлдэгдэл</Text>
          <HStack w="full" justify="space-around">
            <VStack>
              <Text variant="body">{data.balance}₮</Text>
              <Text variant="caption" color="gray">
                Өмнө
              </Text>
            </VStack>
            <VStack>
              <Text variant="body">{sliderValue * 5000}₮</Text>
              <Text variant="caption" color="gray">
                Нэмсэн
              </Text>
            </VStack>
            <VStack>
              <Text variant="body">{data.balance + sliderValue * 5000}₮</Text>
              <Text variant="caption" color="gray">
                Дараа
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack mt={10} align="start" gap={5}>
          <Text variant="bodyBold">Өгөөж эзэмших хувь</Text>
          <HStack w="full" justify="space-around">
            <VStack>
              <Text variant="body">{data.selfRate}%</Text>
              <Text variant="caption" color="gray">
                Өмнө
              </Text>
            </VStack>
            <VStack>
              <Text variant="body">
                {Math.floor((sliderValue * 5000 * 100) / data.totalAmount)}%
              </Text>
              <Text variant="caption" color="gray">
                Нэмсэн
              </Text>
            </VStack>
            <VStack>
              <Text variant="body">
                {data.selfRate +
                  Math.floor((sliderValue * 5000 * 100) / data.totalAmount)}
                %
              </Text>
              <Text variant="caption" color="gray">
                Дараа
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <HStack mt={10}>
          <HStack
            p={3}
            borderRadius="10px"
            border={`1px solid ${isCrypto ? '#DAD7CD' : '#F5B544'}`}
            flex={1}
            onClick={() => setCrypto(false)}
          >
            <KhanBankLogo />
            <Text>Данснаас</Text>
          </HStack>
          <HStack
            p={3}
            borderRadius="10px"
            border={`1px solid ${!isCrypto ? '#DAD7CD' : '#F5B544'}`}
            flex={1}
            onClick={() => setCrypto(true)}
          >
            <MetaMaskLogo />
            <Text>Хэтэвчнээс</Text>
          </HStack>
        </HStack>
        <FormControl display="flex" alignItems="center" gap={3} mt={10}>
          <Switch colorScheme="teal" id="email-alerts" />
          <FormLabel htmlFor="email-alerts" margin="2">
            Үйл ажиллагааны нөхцөл зөвшөөрч байна.
          </FormLabel>
        </FormControl>
        <Button
          variant="solid"
          bgColor="#F5B544"
          width="full"
          mt={10}
          onClick={() => router.push('addFundCrypto')}
        >
          ХӨРӨНГӨ ОРУУЛАХ
        </Button>
      </Box>
    </Box>
  )
}
export default AddFund
