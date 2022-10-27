import { NextPage } from "next";
import Lottie from "lottie-react";
import loadingAnimation from "src/assets/loading-animation";
import { VStack, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
const LoadingTransactionPage: NextPage = () => {
  const router = useRouter();
  const data = router.query;

  return (
    <VStack m="auto" p={8} justify="center" align="center">
      <Lottie
        animationData={loadingAnimation}
        loop={false}
        autoplay
        onComplete={() => router.push("transactionSuccess")}
      />
      <Text>{data.title}</Text>
      <Text>{data.description}</Text>
    </VStack>
  );
};
export default LoadingTransactionPage;
