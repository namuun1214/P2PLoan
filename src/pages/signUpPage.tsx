import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useUser } from '../common/firebase/firebase'
import { Header } from '../components/layout/header'
import SignUpForm from '../components/signUpLogin/signUpForm'
import { useAuth } from '../context/AuthContext'

function SignUpPage() {
  const router = useRouter()
  const { hasUser } = useAuth()
  useEffect(() => {
    hasUser && router.push('/home')
  }, [])
  return (
    <Box p={8}>
      <Header isBack title="Нэвтрэх" />
      <SignUpForm />
    </Box>
  )
}

export default SignUpPage
