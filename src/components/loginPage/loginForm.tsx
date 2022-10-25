import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";

export default function LoginForm() {
  // const [data, setData]=useState(){
  //   email:'';
  //   password:'';
  // }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      console.log(values);
      router.push(`/createGroupPage`);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack p={6} mx="auto" spacing={8}>
        <Text>Нэвтрэх</Text>

        <FormControl>
          <FormLabel htmlFor="name">Цахим хаяг</FormLabel>
          <Input
            id="name"
            type="email"
            {...register("email", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Нууц үг</FormLabel>
          <Input
            id="name"
            type="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
        </FormControl>
        <Button
          mt={4}
          borderRadius="md"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Нэвтрэх
        </Button>
      </VStack>
    </form>
  );
}
