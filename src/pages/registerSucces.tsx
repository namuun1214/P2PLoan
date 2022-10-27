import { Button, VStack, Text, Box, Link, Container } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { CorrectIcon, CopyIcon } from "../components/icons";

function registerSucces() {
  const router = useRouter();
  const hash = router.query.hash;
  const [isCopied, setCopied] = useState(false);
  return (
    <Container
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
          onClick={() => router.push("../group/myGroups")}
          type="button"
        >
          Групп руу очих
        </Button>
      </VStack>
      <Box maxWidth="200px">
        {" "}
        <Text>{hash}</Text>{" "}
      </Box>

      {isCopied ? (
        <Button variant="unstyled" display="flex" alignItems="center">
          <CorrectIcon />
        </Button>
      ) : (
        <CopyToClipboard text={hash} onCopy={() => setCopied(true)}>
          <Button variant="unstyled">
            <CopyIcon />
          </Button>
        </CopyToClipboard>
      )}

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
    </Container>
  );
}

export default registerSucces;
