import { Contract, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { Box, Button, Icon, Progress, Text, VStack } from '@chakra-ui/react'
import { TbShieldLock } from 'react-icons/tb'
import CreateGroupPage from './networkPage'
import { CREATOR_CONTRACT_ADDRESS, abi } from '../../constants/index'
export default function WalletConnect() {
  const owners = [
    '0x43626432525ccEcaF2eA9ba41192e998404A9807',
    '0x2cE7cA7D8BF56A28f654E47F66CC8b2657Ad7fCc',
  ]
  const num = 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6
  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false)
  const [signer, setSigner] = useState(undefined)

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMetamask(true)
    }
  }, [])

  async function connect() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const ethereum = (window.ethereum as unknown) as MetaMaskInpageProvider
        await ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setSigner(provider.getSigner())
        // router.push("/registerSucces"),
      } catch (e) {
        console.log(e)
      }
    } else {
      setIsConnected(false)
    }
  }

  async function create() {
    if (typeof window.ethereum !== 'undefined') {
      const contract = new ethers.Contract(
        CREATOR_CONTRACT_ADDRESS,
        abi,
        signer,
      )
      try {
        const owner = await contract.create(owners, num)
        console.log(owner)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Please install MetaMask')
    }
  }

  return (
    <Box
      height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Progress value={20} size="xs" colorScheme="green" />

      <VStack padding="20">
        {hasMetamask ? (
          isConnected ? (
            <Box>
              <Text>Хэтэвч холбогдсон</Text>
              <Text>{address}</Text>
            </Box>
          ) : (
            <>
              <Icon
                as={TbShieldLock}
                w={10}
                h={10}
                color="green.500"
                marginBottom={6}
              />
              <Button colorScheme="teal" onClick={() => connect()}>
                Хэтэвчээ холбох
              </Button>
            </>
          )
        ) : (
          'Please install metamask'
        )}
        <Button onClick={() => create()}>gvilgee</Button>

        {isConnected ? <CreateGroupPage /> : ''}
      </VStack>
    </Box>
  )
}
