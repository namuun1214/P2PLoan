import {
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import router from "next/router";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

function CreateGroupPage() {
  const [name, setName] = useState("");
  return (
    <VStack>
      <Center height="50vh">
        <FormControl isRequired>
          <FormLabel htmlFor="дугаар"> Группын нэрээ оруулна уу</FormLabel>
          <Input
            value={name}
            id="nameOfGroup"
            type="text"
            onChange={(value) => {
              setName(value.target.value);
            }}
          />
        </FormControl>
      </Center>
      <HStack>
        <Button
          variant="ghost"
          onClick={() => {
            router.push("../connection/walletConnect");
          }}
        >
          {" "}
          Буцах
        </Button>
        <Button
          rightIcon={<FiArrowRight fontSize={20} />}
          variant="solid"
          onClick={() => {
            router.push("../group/createGroupPage2");
          }}
        >
          Дараах
        </Button>
      </HStack>
    </VStack>
  );
}

export default CreateGroupPage;
