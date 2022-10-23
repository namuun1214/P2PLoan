import { Button, VStack, Text, Box } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

function registerSucces() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <VStack spacing="13">
        <AiFillCheckCircle color="#03B936" fontSize={100} />
        <Text color="#03B936">Амжилттай</Text>
        <Text>Таны бүртгэл амжилттай үүслээ</Text>
        <Button
          mt={4}
          colorScheme="teal"
          backgroundColor="#091B3D"
          borderRadius="xl"
          onClick={() => router.push("/homePage")}
          type="button"
        >
          Нүүр хуудас
        </Button>
      </VStack>
    </Box>
  );
}

export default registerSucces;
