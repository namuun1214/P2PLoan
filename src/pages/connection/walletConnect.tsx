import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { Box, Button, Icon, Progress, Text, VStack } from '@chakra-ui/react'
import { TbShieldLock } from 'react-icons/tb'
import CreateGroupPage from './networkPage'
export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [hasMetamask, setHasMetamask] = useState(false)
  const [signer, setSigner] = useState(undefined)

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMetamask(true)
    }
  })

  async function connect() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const ethereum = (window.ethereum as unknown) as MetaMaskInpageProvider
        await ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setSigner(provider.getSigner())
        // router.push("/registerSucces");
      } catch (e) {
        console.log(e)
      }
    } else {
      setIsConnected(false)
    }
  }

  async function execute() {
    if (typeof window.ethereum !== 'undefined') {
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
      const abi = [
        {
          inputs: [
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: '_favoriteNumber',
              type: 'uint256',
            },
          ],
          name: 'addPerson',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          name: 'nameToFavoriteNumber',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'people',
          outputs: [
            {
              internalType: 'uint256',
              name: 'favoriteNumber',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'retrieve',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_favoriteNumber',
              type: 'uint256',
            },
          ],
          name: 'store',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ]
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        await contract.store(42)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Please install MetaMask')
    }
  }
  console.log(signer)
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
            <Text>Хэтэвч холбогдсон</Text>
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

        {isConnected ? <CreateGroupPage /> : ''}
      </VStack>
    </Box>
  )
}
