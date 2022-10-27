/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import {
  VStack,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { TbRouter } from "react-icons/tb";
import router from "next/router";

function NetworkPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [network, setNetwork] = useState("Ethereum");

  return (
    <VStack spacing={5}>
      <HStack>
        <Button variant="outline" onClick={onOpen}>
          {network}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Сүлжээгээ солих</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <Button variant="outline" colorScheme="teal" size="sm">
                  Polygon
                </Button>
                <Button variant="outline" colorScheme="teal" size="sm">
                  BNB Smart Chain
                </Button>
                <Button variant="outline" colorScheme="teal" size="sm">
                  Avalanche
                </Button>
                <Button variant="outline" colorScheme="teal" size="sm">
                  Optimism
                </Button>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Хаах
              </Button>
              <Button colorScheme="teal">Сонгох</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Text>Cүлжээ нь дээр групп үүсгэх</Text>
      </HStack>

      <Button
        rightIcon={<FiArrowRight fontSize={20} />}
        colorScheme="teal"
        variant="solid"
        mr={3}
        onClick={() => router.push("../group/createGroup")}
      >
        Дараах
      </Button>
    </VStack>
  );
}

export default NetworkPage;
