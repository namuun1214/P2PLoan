import { NextPage } from 'next'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  VStack,
  Text,
  Checkbox,
} from '@chakra-ui/react'
import router, { useRouter } from 'next/router'
import React from 'react'
import { KhanBankLogo } from '../../components/icons'
import { MetaMaskLogo } from '../../components/icons/MetaMaskLogo'
import { Header } from '../../components/layout/header'
import { useState } from 'react'
const BorrowFund: NextPage = () => {
  const [sliderValue, setSliderValue] = useState(50)
  const [isCrypto, setCrypto] = useState(false)
  const router = useRouter()
  const data = {
    totalAmount: 1500000,
    balance: 897500,
    selfRate: 0,
    interestRate: 4,
  }
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }
  return (
    <Box p={8}>
      <Header isBack title="Зээл авах" />
      <Box pt={6} gap={5}>
        <Slider
          aria-label="slider-ex-6"
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
        <VStack mt={10} align="start">
          <Text variant="bodyBold">Зээлийн хугацаа</Text>
          <HStack w="full" justify="space-around">
            <HStack
              borderRadius="10px"
              border="1px solid #E7E7E7"
              p={5}
              flex={1}
            >
              <Checkbox isChecked={true} />
              <Text>7 хоног</Text>
            </HStack>
            <HStack
              borderRadius="10px"
              border="1px solid #E7E7E7"
              p={5}
              flex={1}
            >
              <Checkbox />
              <Text>14 хоног</Text>
            </HStack>
            <HStack
              borderRadius="10px"
              border="1px solid #E7E7E7"
              p={5}
              flex={1}
            >
              <Checkbox />
              <Text>30 хоног</Text>
            </HStack>
          </HStack>
        </VStack>
        <HStack mt={10} justify="space-between">
          <Text>Зээлийн хүү: {data.interestRate}%</Text>
          <Text>
            Төлөх дүн:{' '}
            {Math.floor(
              sliderValue * 5000 +
                (100 + (data.interestRate / 30) * 7) * sliderValue,
            )}
          </Text>
        </HStack>

        <HStack mt={10}>
          <HStack
            p={3}
            borderRadius="10px"
            border={`1px solid ${isCrypto ? '#DAD7CD' : '#F5B544'}`}
            flex={1}
            onClick={() => setCrypto(false)}
          >
            <KhanBankLogo />
            <Text>Данс руу</Text>
          </HStack>
          <HStack
            p={3}
            borderRadius="10px"
            border={`1px solid ${!isCrypto ? '#DAD7CD' : '#F5B544'}`}
            flex={1}
            onClick={() => setCrypto(true)}
          >
            <MetaMaskLogo />
            <Text>Хэтэвч рүү</Text>
          </HStack>
        </HStack>
        <FormControl display="flex" alignItems="center" gap={3} mt={10}>
          <Switch colorScheme="teal" id="email-alerts" />
          <FormLabel htmlFor="email-alerts" margin="2">
            Нэрээ нууцална
          </FormLabel>
        </FormControl>
        <FormControl display="flex" alignItems="center" gap={3} mt={5}>
          <Switch colorScheme="teal" id="email-alerts" />
          <FormLabel htmlFor="email-alerts" margin="2">
            Үйл ажиллагааны нөхцөл зөвшөөрч байна.
          </FormLabel>
        </FormControl>
        <Button
          variant="solid"
          bgColor="#2772F0"
          width="full"
          mt={10}
          onClick={() =>
            router.push({
              pathname: 'loadTransaction',
              query: {
                title: 'Шилжүүлж байна',
                description: `Таны хэтэвч рүү ${
                  sliderValue * 5000
                } MONT шилжүүлж байна.`,
              },
            })
          }
        >
          ЗЭЭЛЭХ
        </Button>
      </Box>
    </Box>
  )
}
export default BorrowFund
