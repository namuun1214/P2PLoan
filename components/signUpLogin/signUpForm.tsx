import { useForm } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Box,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { GiArchiveRegister } from "react-icons/gi";
import router from "next/router";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { authentication } from "../../src/config/firebase";
import React from "react";

function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const countryCode = "+97686481515";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [counter, setCounter] = useState(60);
  const [OTP, setOtp] = useState();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "visible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = (e: any) => {
    // ymar negen condition shalgaagv shuud
    setExpandForm(true);
    console.log(e);
    generateRecaptcha();
    let appVerifeir = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, e, appVerifeir)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit(requestOTP)}>
        <VStack width="400px" p="6" spacing={8}>
          <Text>Бүртгүүлэх</Text>
          <FormControl isRequired>
            <FormLabel htmlFor="дугаар">Утасны дугаар</FormLabel>
            <Input
              // value={phoneNumber}
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber", {
                required: "This is required",
                minLength: { value: 8, message: "Minimum length should be 8" },
              })}
            />
          </FormControl>
          {/* <FormControl>
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
          </FormControl> */}

          {expandForm === false ? (
            <>
              <Button
                rightIcon={<FiArrowRight fontSize={20} />}
                mt={4}
                colorScheme="teal"
                borderRadius="md"
                isLoading={isSubmitting}
                type="submit"
                backgroundColor="#091B3D"
              >
                Дараах{" "}
              </Button>
            </>
          ) : null}

          {expandForm === true ? (
            <>
              <Text padding="3">
                Таны {countryCode} дугаарт ирсэн 6 оронтой тоог оруулна уу.
              </Text>
              <Text padding="3">00:{counter}</Text>
              <HStack>
                <PinInput type="alphanumeric">
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <Button
                variant="link"
                colorScheme="teal"
                borderRadius="md"
                type="button"
                onClick={() => setCounter(60)}
              >
                Дахин илгээх
              </Button>
            </>
          ) : null}
        </VStack>
      </form>
      <Box id="recaptcha"></Box>
      {expandForm === true ? (
        <>
          <Button
            mt={4}
            rightIcon={<GiArchiveRegister fontSize={20} />}
            colorScheme="teal"
            backgroundColor="#091B3D"
            onClick={() => router.push("/registerSucces")}
            type="button"
          >
            Бүртгүүлэх
          </Button>
        </>
      ) : null}
    </Box>
  );
}
export default SignUpForm;
