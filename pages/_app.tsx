import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import { ClerkProvider } from "@clerk/nextjs";
function MyApp({ Component, pageProps }: AppProps) {
  const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

  return (
    <Box>
      <Head>
        <title>U2U</title>
        <meta name="description" content="This is RPG" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ClerkProvider
        frontendApi={clerkFrontendApi}
        navigate={(to) => router.push(to)}
      >
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ClerkProvider>
    </Box>
  );
}

export default MyApp;
