import { HStack, VStack } from '@chakra-ui/layout'
import {
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronRight, CopyIcon, CorrectIcon } from '../../components/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { PaymentSection } from '../../components/icons/common/payment'
import React, { useState } from 'react'
const RoomPage = () => {
  const data = {
    roomName: 'Girls Night',
    accountNumber: '5034816547',
    ownerName: 'Тогообор Намуун',
    bankName: 'Хаанбанк',
    totalAmount: '128000',
  }
  const [isCopied, setCopied] = useState({
    acountNumber: false,
    ownerName: false,
    totalAmount: false,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  return (
    <VStack
      w="full"
      p={6}
      width={{ base: '100%', md: '40%' }}
      mx="auto"
      spacing={12}
    >
      <Text variant="bodyBold">{data.roomName}</Text>
      <VStack w="full" spacing={4}>
        <Text>Төлөх дүн</Text>
        <Text variant="heading1" fontFamily="Montserrat">
          ₮{data.totalAmount}
        </Text>
        <HStack justifyContent="space-between" w="full">
          <Text>Банк</Text>
          <Text>{data.bankName}</Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text>Данс</Text>
          <HStack>
            <Text>{data.accountNumber}</Text>
            {isCopied.acountNumber ? (
              <Button variant="unstyled" display="flex" alignItems="center">
                <CorrectIcon />
              </Button>
            ) : (
              <CopyToClipboard
                text={data.accountNumber}
                onCopy={() =>
                  setCopied((prev) => ({ ...prev, acountNumber: true }))
                }
              >
                <Button variant="unstyled">
                  <CopyIcon />
                </Button>
              </CopyToClipboard>
            )}
          </HStack>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text>Хүлээн авагч</Text>
          <HStack>
            <Text>{data.ownerName}</Text>
            {isCopied.ownerName ? (
              <Button variant="unstyled" display="flex" alignItems="center">
                <CorrectIcon />
              </Button>
            ) : (
              <CopyToClipboard
                text={data.ownerName}
                onCopy={() =>
                  setCopied((prev) => ({ ...prev, ownerName: true }))
                }
              >
                <Button variant="unstyled">
                  <CopyIcon />
                </Button>
              </CopyToClipboard>
            )}
          </HStack>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text>Дүн</Text>
          <HStack>
            <Text>{data.totalAmount}</Text>
            {isCopied.totalAmount ? (
              <Button variant="unstyled" display="flex" alignItems="center">
                <CorrectIcon />
              </Button>
            ) : (
              <CopyToClipboard
                text={data.totalAmount}
                onCopy={() =>
                  setCopied((prev) => ({ ...prev, totalAmount: true }))
                }
              >
                <Button variant="unstyled">
                  <CopyIcon />
                </Button>
              </CopyToClipboard>
            )}
          </HStack>
        </HStack>
        <PaymentSection />
      </VStack>
      <Button
        variant="solid"
        w="50%"
        position="fixed"
        bottom={10}
        onClick={onOpen}
      >
        <HStack spacing={5}>
          <Text>Төлсөн</Text>
          <ChevronRight />
        </HStack>
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent p={5} m={5}>
          <ModalHeader>Мэдээллээ оруулна уу</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              {/* <FormLabel>Нэр</FormLabel> */}
              <Input ref={initialRef} placeholder="Нэрээ оруулна уу" />
            </FormControl>

            <FormControl mt={4}>
              {/* <FormLabel>Сэтгэгдэл</FormLabel> */}
              <Input h={20} placeholder="Сэтгэгдэл" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              mr={3}
              onClick={() => alert('done')}
              w="full"
            >
              Хадгалах
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
export default RoomPage
