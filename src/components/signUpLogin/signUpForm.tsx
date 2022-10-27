import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import {
  FormLabel,
  FormControl,
  Button,
  VStack,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Box,
  Input,
} from "@chakra-ui/react";
import router from "next/router";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  User,
  ApplicationVerifier,
} from "firebase/auth";
import { useEffect, useState } from "react";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  auth,
  updateDocument,
  useCollection,
  useDocumentWithUser,
  useDocumentWithUserOnce,
  useUser,
} from "../../config/common/firebase/firebase";
declare global {
  interface Window {
    recaptchaVerifier: ApplicationVerifier;
    confirmationResult: ConfirmationResult;
  }
}
function SignUpForm() {
  const {
    formState: { isSubmitting },
  } = useForm();
  const { setUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [counter, setCounter] = useState(60);
  const { user } = useUser();

  useEffect(() => {
    if (auth || typeof window !== undefined) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha",
        {
          size: "visible",
          callback: () => {
            setExpandForm(true);
          },
        },
        auth
      );
    }
  }, []);
  const createUserOnFirebase = (user: { uid: any }) => {
    try {
      updateDocument(`users/${user.uid}`, { phoneNumber: phoneNumber });
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (phoneNumber: string): Promise<ConfirmationResult> => {
    return new Promise((response, reject) => {
      signInWithPhoneNumber(
        auth,
        `+976${phoneNumber}`,
        window.recaptchaVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          response(confirmationResult);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  };
  const resendCode = async (
    phoneNumber: string
  ): Promise<ConfirmationResult> => {
    return login(phoneNumber);
  };
  const confirmCode = (confirmationCode: string): Promise<User> => {
    return new Promise((response, reject) => {
      window.confirmationResult
        .confirm(confirmationCode)

        .then((result: any) => {
          setUser(result.user as User);
          createUserOnFirebase(result.user);
          response(result.user);
        })

        .catch((error: Error) => {
          reject(error);
        });
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
      justifyContent="start"
      alignItems="center"
      height="100vh"
    >
      <form>
        <VStack width="400px" p="6" spacing={8}>
          {!expandForm ? (
            <>
              <FormControl isRequired>
                <FormLabel htmlFor="дугаар">Утасны дугаар</FormLabel>
                <Input
                  value={phoneNumber}
                  id="phoneNumber"
                  type="tel"
                  onChange={(value) => {
                    setPhoneNumber(value.target.value);
                  }}
                />
              </FormControl>
              <Box id="recaptcha"></Box>
              <Button mt={4} variant="solid" onClick={() => login(phoneNumber)}>
                Дараах{" "}
              </Button>
            </>
          ) : (
            <VStack spacing={2}>
              <Text padding="3">
                Таны {phoneNumber} дугаарт ирсэн 6 оронтой тоог оруулна уу.
              </Text>

              <HStack spacing={5}>
                <PinInput
                  type="alphanumeric"
                  onComplete={(value) =>
                    confirmCode(value)
                      .then(() => {
                        router.push("/group/transactionSuccess");
                      })
                      .catch((error) => {
                        alert("Code is wrong");
                      })
                  }
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <HStack>
                <Button
                  variant="link"
                  type="button"
                  onClick={() => resendCode(phoneNumber)}
                  disabled={counter > 0}
                >
                  Дахин илгээх {counter} сек
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>
      </form>
    </Box>
  );
}
export default SignUpForm;
