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
import { AiOutlineClose } from "react-icons/ai";
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activePrivate, setActivePrivate] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activePublic, setActivePublic] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeMember1, setActiveMember1] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeMember2, setActiveMember2] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeMember3, setActiveMember3] = useState(false);

  const groupName = "test";
  const userName1 = "Ramazan Velichkov";
  const userName2 = "Raymundo Suzuki";
  const userName3 = "Elena Kayode";

  const userAddress1 = "8.2";
  const userAddress2 = "7.3";
  const userAddress3 = "9.2";

  const format = (val: string) => `%` + val;
  const parse = (val: string) => val.replace(/^\$/, "");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");

  return (
    <VStack gap="1">
      <HStack
        borderBottom="1px"
        borderColor="#2930561A"
        width="full"
        height="50px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingRight="2"
        paddingLeft="24"
      >
        {" "}
        <Text>Групп үүсгэх</Text>
        <AiOutlineClose fontSize={20} color="#293056" />
      </HStack>
      <HStack width="320px" marginTop="10px">
        <FormControl isRequired>
          <FormLabel fontSize="16px" color="#293056" htmlFor="дугаар">
            {" "}
            Нэрээ оруулна уу
          </FormLabel>
          <Input
            value={name}
            variant="flushed"
            id="nameOfGroup"
            type="text"
            onChange={(value) => {
              setName(value.target.value);
            }}
          />
        </FormControl>
      </HStack>
      <Flex marginY="30px" width="320px" alignItems="center" gap="2">
        <Text color="#091B3D">Найз нэмэх</Text>
        <Spacer />
        <HStack>
          <Text color="#646060" fontSize={10}>
            Бүгдийг үзэх
          </Text>
          <FiArrowRight fontSize={20} color="#2772F0" />
        </HStack>
      </Flex>
      <VStack gap="3">
        <HStack width="320px" justifyContent="space-between">
          {" "}
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            justifyContent="start"
          >
            <Avatar name="Dan Abrahmov" src="https://i.pravatar.cc/100?img=3" />
            <Box display="flex" flexDirection="column" justifyContent="start">
              <Text fontSize="14px" color="#091B3D">
                {userName1}
              </Text>
              <HStack>
                <AiFillStar fill="#F5B544" />
                <Text fontSize={10}>{userAddress1}</Text>
              </HStack>
            </Box>
          </Box>
          {!activeMember1 ? (
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="Call Sage"
              fontSize="20px"
              onClick={() => setActiveMember1(true)}
              icon={<BsCheckCircle />}
            />
          ) : (
            <IconButton
              variant="ghost"
              colorScheme="teal"
              aria-label="Call Sage"
              fontSize="20px"
              onClick={() => setActiveMember1(false)}
              icon={<BsCheckCircle />}
            />
          )}
        </HStack>
        <HStack width="320px" justifyContent="space-between">
          {" "}
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            justifyContent="start"
          >
            <Avatar
              name="Dan Abrahmov"
              src="https://i.pravatar.cc/100?img=10"
            />
            <Box display="flex" flexDirection="column" justifyContent="start">
              <Text fontSize="14px" color="#091B3D">
                {userName2}
              </Text>
              <HStack>
                <AiFillStar fill="#F5B544" />
                <Text fontSize={10}>{userAddress2}</Text>
              </HStack>
            </Box>
          </Box>
          {!activeMember2 ? (
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="Call Sage"
              fontSize="20px"
              onClick={() => setActiveMember2(true)}
              icon={<BsCheckCircle />}
            />
          ) : (
            <IconButton
              variant="ghost"
              colorScheme="teal"
              aria-label="Call Sage"
              fontSize="20px"
              onClick={() => setActiveMember2(false)}
              icon={<BsCheckCircle />}
            />
          )}
        </HStack>
        <HStack width="320px" justifyContent="space-between">
          {" "}
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            justifyContent="start"
          >
            <Avatar name="Dan Abrahmov" src="https://i.pravatar.cc/100?img=1" />
            <Box display="flex" flexDirection="column" justifyContent="start">
              <Text fontSize="14px" color="#091B3D">
                {userName3}
              </Text>
              <HStack>
                <AiFillStar fill="#F5B544" />
                <Text fontSize={10}>{userAddress3}</Text>
              </HStack>
            </Box>
          </Box>
          {!activeMember3 ? (
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="Call Sage"
              fontSize="20px"
              onClick={() => setActiveMember3(true)}
              icon={<BsCheckCircle />}
            />
          ) : (
            <IconButton
              variant="ghost"
              colorScheme="teal"
              aria-label="Call Sage"
              fontSize="20px"
              onClick={() => setActiveMember3(false)}
              icon={<BsCheckCircle />}
            />
          )}
        </HStack>
      </VStack>
      <Box
        width="320px"
        display="flex"
        alignItems="start"
        flexDirection="column"
      >
        <FormLabel color="#293056">Группын хүү</FormLabel>
        <NumberInput
          width="320px"
          variant="flushed"
          onChange={(valueString) => setValue(parse(valueString))}
          value={format(value)}
          max={100}
        >
          {" "}
          <NumberInputField />
        </NumberInput>
      </Box>
      <HStack marginTop="6">
        {!activePrivate ? (
          <Button
            colorScheme="teal"
            variant="outline"
            boxShadow="xl"
            onClick={() => {
              setActivePublic(false);
              setActivePrivate(true);
            }}
          >
            PRIVATE
          </Button>
        ) : (
          <Button
            colorScheme="teal"
            variant="outline"
            border="2px"
            boxShadow="dark-lg"
            borderColor="green.500"
            onClick={() => {
              setActivePrivate(false);
            }}
          >
            PRIVATE
          </Button>
        )}
        {!activePublic ? (
          <Button
            colorScheme="teal"
            variant="outline"
            boxShadow="xl"
            onClick={() => {
              setActivePublic(true);
              setActivePrivate(false);
            }}
          >
            PUBLIC
          </Button>
        ) : (
          <Button
            colorScheme="teal"
            variant="outline"
            border="2px"
            boxShadow="dark-lg"
            borderColor="green.500"
            onClick={() => {
              setActivePublic(false);
            }}
          >
            PUBLIC
          </Button>
        )}{" "}
      </HStack>
      <Box
        width="320px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        justifyContent="center"
      >
        <FormControl display="flex" alignItems="center">
          <Switch colorScheme="teal" id="email-alerts" />
          <FormLabel htmlFor="email-alerts" margin="2">
            Үйл ажиллагааны нөхцөл зөвшөөрч байна.
          </FormLabel>
        </FormControl>
        <Button
          paddingX="16"
          variant="solid"
          colorScheme="teal"
          onClick={onOpen}
        >
          Групп үүсгэх
        </Button>
      </Box>
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
            <Button variant="solid" onClick={() => router.push("../homePage")}>
              Нүүр хуудас
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default createGroupPage2;
