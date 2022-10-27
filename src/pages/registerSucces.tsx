import { Button, VStack, Text, Box, Link } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";

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
        <Text>Таны групп амжилттай үүслээ</Text>
        <Button
          mt={4}
          rightIcon={<FiArrowRight fontSize={20} />}
          colorScheme="teal"
          backgroundColor="#091B3D"
          variant="solid"
          onClick={() => router.push("/group/testGroup")}
          type="button"
        >
          Групп руу очих
        </Button>
        <Link
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="1"
          href="https://testnet.bscscan.com/"
          isExternal
        >
          <Text> Гүйлгээг харах</Text>
          <FiExternalLink />
        </Link>
      </VStack>
    </Box>
  );
}

export default registerSucces;
