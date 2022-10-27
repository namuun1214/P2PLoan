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
  Icon,
} from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import router from "next/router";
import { Header } from "../../components/layout/header";
import { Contract, ethers } from "ethers";
import { CREATOR_CONTRACT_ADDRESS, abi1, count } from "../../constants/index";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { getJsonWalletAddress } from "ethers/lib/utils";
import { useRef } from "react";
import {
  firestore,
  useDocument,
  useCollection,
} from "../../config/common/firebase/firebase";
import { from } from "rxjs";
import { addDoc, Firestore } from "firebase/firestore";

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
  const [name, setName] = useState("");

  const userName1 = "Ramazan Velichkov";
  const userName2 = "Raymundo Suzuki";
  const userName3 = "Elena Kayode";
  const groupName = "test";
  const userAddress1 = "8.2";
  const userAddress2 = "7.3";
  const userAddress3 = "9.2";
  const newHash = "";

  const format = (val: string) => `%` + val;
  const parse = (val: string) => val.replace(/^\$/, "");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("");
  const { user } = useUser();
  const { data } = useDocument(`users/${user?.uid}`);
  const [signer, setSigner] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isWalletCreated, setIsWalletCreated] = useState(false);

  const num = 1;
  const owners = [
    "0x43626432525ccEcaF2eA9ba41192e998404A9807",
    "0x2cE7cA7D8BF56A28f654E47F66CC8b2657Ad7fCc",
  ];

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, []);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const ethereum = window.ethereum as unknown as MetaMaskInpageProvider;
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }
  const formRef = useRef();

  async function create() {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(
        CREATOR_CONTRACT_ADDRESS,
        abi1,
        signer
      );
      try {
        const creator = await contract.create(owners, num);
        console.log(creator);
        setIsWalletCreated(true);
        router.push("/registerSucces");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  console.log(value);
  console.log(name);

  let groups: [string] = (data && data.groups) || [];

  const createGroup = () => {
    updateDocument(`groups/${user?.uid}-${data?.groups?.length || 0}`, {
      name: name,
      members: [
        "https://i.pravatar.cc/100?img=10",
        "https://i.pravatar.cc/100?img=10",
      ],
      totalAmount: 0,
      loanInterest: value,
    });
    groups && groups?.push(` ${user?.uid}-${data?.groups?.length || 0} `);
    updateDocument(`users/${user?.uid}`, { groups: groups });
  };
  return (
    <Box p={8}>
      <Header isBack title="Групп үүсгэх" hasCloseButton />
      <VStack gap={10} w="full" pt={5}>
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
            borderColor="gray"
            onChange={(value) => {
              setName(value.target.value);
            }}
          />
        </FormControl>
        <Flex gap="2" w="full">
          <Text color="#091B3D">Найз нэмэх</Text>
          <Spacer />
          <HStack>
            <Text color="#646060" fontSize={10}>
              Бүгдийг үзэх
            </Text>
            <FiArrowRight fontSize={20} color="#2772F0" />
          </HStack>
        </Flex>
        <VStack gap="3" w="full">
          <HStack w="full" justifyContent="space-between">
            {" "}
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              justifyContent="start"
            >
              <Avatar
                name="Dan Abrahmov"
                src="https://i.pravatar.cc/100?img=3"
              />
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
          <HStack w="full" justifyContent="space-between">
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
          <HStack w="full" justifyContent="space-between">
            {" "}
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              justifyContent="start"
            >
              <Avatar
                name="Dan Abrahmov"
                src="https://i.pravatar.cc/100?img=1"
              />
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
        <Box display="flex" alignItems="start" flexDirection="column" w="full">
          <FormLabel color="#293056">Зээлийн хүү</FormLabel>
          <NumberInput
            variant="flushed"
            onChange={(valueString) => setValue(parse(valueString))}
            value={format(value)}
            max={100}
            borderColor="gray"
          >
            {" "}
            <NumberInputField />
          </NumberInput>
        </Box>
        <HStack marginTop="6" justify="space-around" w="full">
          {!activePrivate ? (
            <Button
              width="150px"
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
              width="150px"
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
              width="150px"
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
              width="150px"
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
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="20px"
          justifyContent="center"
        >
          <FormControl display="flex" alignItems="center" gap={3}>
            <Switch colorScheme="teal" id="email-alerts" />
            <FormLabel htmlFor="email-alerts" margin="2">
              Үйл ажиллагааны нөхцөл зөвшөөрч байна.
            </FormLabel>
          </FormControl>

          {hasMetamask ? (
            isConnected ? (
              <Text>Хэтэвч холбогдсон</Text>
            ) : (
              <>
                <Button colorScheme="teal" onClick={() => connect()}>
                  Хэтэвчээ холбох
                </Button>
              </>
            )
          ) : (
            "Please install metamask"
          )}
          <Button
            variant="solid"
            colorScheme="teal"
            onClick={() => {
              createGroup();
              router.push({
                pathname: "loadTransaction",
                query: {
                  title: "Үүсгэж байна",
                  description: "Таны группд дундын данс үүсгэж байна",
                },
              });
            }}
          >
            Групп үүсгэх
          </Button>
        </Box>
        {!isWalletCreated ? (
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent alignItems="center">
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
                <Button
                  variant="link"
                  onClick={() => {
                    router.push("/home");
                  }}
                >
                  Нүүр хуудас
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          <></>
        )}
      </VStack>
    </Box>
  );
}

export default createGroupPage2;
