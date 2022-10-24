import { useForm } from 'react-hook-form'
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
} from '@chakra-ui/react'
import router from 'next/router'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  User,
  ApplicationVerifier,
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { authentication } from '../../src/config/firebase'
import React from 'react'
import { useAuth } from '../../src/context/AuthContext'
declare global {
  interface Window {
    recaptchaVerifier: ApplicationVerifier
    confirmationResult: ConfirmationResult
  }
}
function SignUpForm() {
  const {
    formState: { isSubmitting },
  } = useForm()
  const { setUser } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [expandForm, setExpandForm] = useState(false)
  const [counter, setCounter] = useState(60)
  useEffect(() => {
    if (authentication || typeof window !== undefined) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha',
        {
          size: 'visible',
          callback: () => {
            setExpandForm(true)
          },
        },
        authentication,
      )
    }
  }, [])

  const login = async (phoneNumber: string): Promise<ConfirmationResult> => {
    return new Promise((response, reject) => {
      signInWithPhoneNumber(
        authentication,
        `+976${phoneNumber}`,
        window.recaptchaVerifier,
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult
          response(confirmationResult)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  const resendCode = async (
    phoneNumber: string,
  ): Promise<ConfirmationResult> => {
    return login(phoneNumber)
  }
  const confirmCode = (confirmationCode: string): Promise<User> => {
    return new Promise((response, reject) => {
      window.confirmationResult
        .confirm(confirmationCode)

        .then((result: any) => {
          console.log(result.user)
          setUser(result.user as User)

          response(result.user)
        })

        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  useEffect(() => {
    const timer = setInterval(() => setCounter(counter - 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form>
        <VStack width="400px" p="6" spacing={8}>
          <Text variant="bodyBold">Бүртгүүлэх</Text>

          {!expandForm ? (
            <>
              <FormControl isRequired>
                <FormLabel htmlFor="дугаар">Утасны дугаар</FormLabel>
                <Input
                  value={phoneNumber}
                  id="phoneNumber"
                  type="tel"
                  onChange={(value) => {
                    setPhoneNumber(value.target.value)
                  }}
                />
              </FormControl>
              <Box id="recaptcha"></Box>
              <Button
                mt={4}
                variant="solid"
                onClick={() => login(phoneNumber)}
                backgroundColor="#091B3D"
              >
                Дараах{' '}
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
                        router.push('/registerSucces')
                      })
                      .catch((error) => {
                        alert('Code is wrong')
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
  )
}
export default SignUpForm
