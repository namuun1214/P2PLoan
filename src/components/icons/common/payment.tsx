import { HStack, VStack } from '@chakra-ui/layout'
import { Text, Box, Button } from '@chakra-ui/react'
import Link from 'next/link'
import {
  KhanBankLogo,
  KhasBankLogo,
  GolomtBankLogo,
  TDBankLogo,
  StateBankLogo,
  SocialPayLogo,
  MonPayLogo,
  MongolChatLogo,
  QPassLogo,
  PocketLogo,
  LendLogo,
} from '..'

export const PaymentSection = () => {
  const launchAppOnAppleDevice = (url: string) => {
    window.location.replace(url)
  }
  // const launchAppOnAndroidDevice = () => {
  //   const url =
  //     'intent://chromecast.com/#Intent;scheme=comgooglecast;package=com.google.android.apps.chromecast.app;end'
  //   window.location.replace(url)
  // }
  return (
    <VStack w="full" spacing={4}>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('khanbank://')}
      >
        <KhanBankLogo />

        <Text>Хаан банк</Text>
      </HStack>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('xacbank://')}
      >
        <KhasBankLogo />
        <Text>Хас банк</Text>
      </HStack>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('golomtbank://')}
      >
        <GolomtBankLogo />
        <Text>Голомт банк</Text>
      </HStack>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('tdbbank://')}
      >
        <TDBankLogo />
        <Text>Худалдаа хөгжлийн банк</Text>
      </HStack>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('statebank://')}
      >
        <StateBankLogo />
        <Text>Төрийн банк</Text>
      </HStack>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('socialpay-payment://')}
      >
        <SocialPayLogo />
        <Text>Social Pay</Text>
      </HStack>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('pass://')}
      >
        <QPassLogo />
        <Text>Pass</Text>
      </HStack>
      {/* <HStack border="0.5px solid #DCDCDC" borderRadius={5} p={5} w="full">
        <MonPayLogo />
        <Text>Mon Pay</Text>
      </HStack>
      <HStack border="0.5px solid #DCDCDC" borderRadius={5} p={5} w="full">
        <MongolChatLogo />
        <Text>Mongol Chat</Text>
      </HStack> */}

      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('pckt://')}
      >
        <PocketLogo />
        <Text>Pocket</Text>
      </HStack>
      <HStack
        border="0.5px solid #DCDCDC"
        borderRadius={5}
        p={5}
        w="full"
        onClick={() => launchAppOnAppleDevice('lendmn://')}
      >
        <LendLogo />

        <Text>Lend</Text>
      </HStack>
      <Box h={20}></Box>
    </VStack>
  )
}
