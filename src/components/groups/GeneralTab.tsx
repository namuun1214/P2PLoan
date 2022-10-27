import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { HStack, VStack, Text } from "@chakra-ui/layout";

export const GeneralTab = ({ members }) => {
  return (
    <VStack gap={6}>
      <HStack
        py={3}
        px={5}
        borderRadius="15px"
        boxShadow="3px 4px 20px #E7D7B0"
      >
        {members.map((el, index) => (
          <VStack justifyContent="center">
            <Avatar name="hh" src={el} borderRadius="md" />
            <Text>User {index + 1} </Text>
          </VStack>
        ))}
      </HStack>
      <HStack justify="space-around" w="full">
        <Button variant="link" textDecorationLine="underline">
          Ашигаа татах
        </Button>
        <Button variant="link" textDecorationLine="underline">
          Зээлээ төлөх
        </Button>
      </HStack>
      <HStack>
        <VStack
          py={3}
          px={5}
          borderRadius="15px"
          boxShadow="3px 4px 20px #E7D7B0"
          justify="center"
          w="full"
        >
          <Text textAlign="center" variant="caption">
            ОРУУЛСАН ХӨРӨНГӨ ОРУУЛАЛТ
          </Text>
          <Text textAlign="center">0 ₮</Text>
        </VStack>
        <VStack
          py={3}
          px={5}
          borderRadius="15px"
          boxShadow="3px 4px 20px #E7D7B0"
          justify="center"
          w="full"
        >
          <Text textAlign="center" variant="caption">
            ДУНДЫН ДАНСНААС ЗЭЭЛСЭН МӨНГӨ
          </Text>
          <Text textAlign="center">0 ₮</Text>
        </VStack>
      </HStack>
      <HStack>
        <VStack
          py={3}
          px={5}
          borderRadius="15px"
          boxShadow="3px 4px 20px #E7D7B0"
          justify="center"
          w="full"
        >
          <Text textAlign="center" variant="caption">
            ХӨРӨНГӨ ОРУУЛАЛТААС ХҮРТСЭН АШИГ
          </Text>
          <Text textAlign="center">0 ₮</Text>
        </VStack>
        <VStack
          py={3}
          px={5}
          borderRadius="15px"
          boxShadow="3px 4px 20px #E7D7B0"
          justify="center"
          w="full"
        >
          <Text textAlign="center" variant="caption">
            ТӨЛСӨН ХҮҮГИЙН ОРЛОГО
          </Text>
          <Text textAlign="center">0 ₮</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
