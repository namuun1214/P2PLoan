import type { NextPage } from "next";
import Head from "next/head";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import SignUpPage from "./login";
import { useUser } from "../config/common/firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const { user } = useUser();
  // console.log(user)
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <Box>
      <Head>
        <title>Home</title>
        <meta name="description" content="This is RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text variant="heading1" textAlign="center">
          Сайн байна уу {user?.phoneNumber}
        </Text>
        <VStack>
          <Button
            variant="link"
            onClick={() => {
              router.push("/group/myGroups");
            }}
          >
            Миний группууд
          </Button>
          <Button
            onClick={() => {
              void logout();
              void router.push("/login");
            }}
          >
            Гарах
          </Button>
        </VStack>
      </main>
    </Box>
  );
};

export default HomePage;
