import {
  VStack,
  Text,
  HStack,
  Center,
  Button,
  Box,
  Flex,
  Spacer,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
  IconButton,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";

import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import router from "next/router";

function createGroupPage2() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  const groupName = "test";
  const userName = "Munkhbayasgalan";
  const userAddress = "0x0000001";
  const format = (val: string) => `%` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  return (
    <Center height="70vh" marginTop="100px">
      <VStack borderWidth="2px" borderRadius="lg" paddingY="20" paddingX="6">
        <HStack>
          <Text as="b"> ГРУППЫН НЭР:</Text>
          <Text>{groupName}</Text>
        </HStack>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Text>Найз нэмэх</Text>
          <Spacer />
          <Button
            rightIcon={<FiArrowRight fontSize={20} color="teal" />}
            variant="unstyled"
            color="#646060"
            fontSize={15}
          >
            Бүгдийг үзэх
          </Button>
        </Flex>
        <VStack>
          <HStack>
            {" "}
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Box display="flex" flexDirection="column" justifyContent="start">
              <Text>{userName}</Text>
              <HStack>
                <AiFillStar />
                <Text fontSize={10}>{userAddress}</Text>
              </HStack>
            </Box>
            <IconButton
              variant="ghost"
              colorScheme="teal"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<BsCheckCircle />}
            />
          </HStack>
          <HStack>
            {" "}
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Box display="flex" flexDirection="column" justifyContent="start">
              <Text>{userName}</Text>
              <HStack>
                <AiFillStar />
                <Text fontSize={10}>{userAddress}</Text>
              </HStack>
            </Box>
            <IconButton
              variant="ghost"
              colorScheme="teal"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<BsCheckCircle />}
            />
          </HStack>
          <HStack>
            {" "}
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Box display="flex" flexDirection="column" justifyContent="start">
              <Text>{userName}</Text>
              <HStack>
                <AiFillStar />
                <Text fontSize={10}>{userAddress}</Text>
              </HStack>
            </Box>
            <IconButton
              variant="ghost"
              colorScheme="teal"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<BsCheckCircle />}
            />
          </HStack>
        </VStack>
        <FormLabel>Группын хүү</FormLabel>
        <NumberInput
          onChange={(valueString) => setValue(parse(valueString))}
          value={format(value)}
          max={50}
        >
          {" "}
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <HStack>
          <Button colorScheme="teal" variant="outline">
            PRIVATE
          </Button>
          <Button colorScheme="teal" variant="outline">
            PUBLIC
          </Button>
        </HStack>
        <FormControl display="flex" alignItems="center">
          <Switch colorScheme="teal" id="email-alerts" />
          <FormLabel htmlFor="email-alerts" margin="2">
            Үйл ажиллагааны нөхцөл зөвшөөрч байна.
          </FormLabel>
        </FormControl>
        <Button variant="solid" colorScheme="teal" onClick={onOpen}>
          Групп үүсгэх
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Баяр хүргэе</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <AiFillCheckCircle color="#03B936" fontSize={100} />
                <Text color="#03B936">Амжилттай</Text>
                <Text>Таны групп амжилттай үүслээ</Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => router.push("../homePage")}>
                Нүүр хуудас
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Center>
  );
}

export default createGroupPage2;
