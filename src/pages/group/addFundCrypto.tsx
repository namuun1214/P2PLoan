import { Box, Button, HStack, Select, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { CopyIcon, CorrectIcon } from '../../components/icons'
import { SampleQr } from '../../components/icons/SampleQR'
import { Header } from '../../components/layout/header'
import SelectCommon from '../../components/Select'

const AddFundCrypto: NextPage = () => {
  const [selectedAsset, setSelectedAsset] = useState()
  const [selectedNetwork, setSelectedNetwork] = useState()
  const [isCopied, setCopied] = useState(false)
  const accountAddress = '3BNGGS462ckRHhGCOH84cbKEwubLBTR9od'
  const router = useRouter()
  return (
    <Box p={8} w="full">
      <Header isBack title="Хөрөнгө оруулах" />
      <Box gap={5}>
        <Box mt={10}>
          <SelectCommon
            value={selectedAsset}
            options={[{ label: 'MONT', value: 'MONT' }]}
            isMulti={false}
            isClearable={true}
            placeholder={'Asset-аа сонгоно уу'}
          />
        </Box>
        <Box mt={10}>
          <SelectCommon
            value={selectedNetwork}
            options={[{ label: 'Eth', value: 'Eth' }]}
            isMulti={false}
            isClearable={true}
            placeholder={'Network-оо сонгоно уу'}
          />
        </Box>
        <Box
          borderRadius="10px"
          border="1px solid #E5E5E5"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={8}
          mt={10}
        >
          <SampleQr />
        </Box>
        <HStack
          borderRadius="10px"
          border="1px solid #E5E5E5"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          py={8}
          mt={10}
        >
          <Text variant="caption">
            Wallet <br />
            address
          </Text>
          <Box maxWidth="200px">
            <Text>{accountAddress}</Text>
          </Box>
          {isCopied ? (
            <Button variant="unstyled" display="flex" alignItems="center">
              <CorrectIcon />
            </Button>
          ) : (
            <CopyToClipboard
              text={accountAddress}
              onCopy={() => setCopied(true)}
            >
              <Button variant="unstyled">
                <CopyIcon />
              </Button>
            </CopyToClipboard>
          )}
        </HStack>
        <Button
          variant="solid"
          w="full"
          mt={10}
          onClick={() =>
            router.push({
              pathname: 'loadTransaction',
              query: {
                title: 'Шалгаж байна',
                description: `Таны илгээсэн мөнгөн дүнг шалгаж байна.`,
              },
            })
          }
        >
          Болсон
        </Button>
      </Box>
    </Box>
  )
}
export default AddFundCrypto
