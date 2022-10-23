import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LoginForm from "../components/loginPage/loginForm";
import SignUpForm from "../components/signUpLogin/signUpForm";
import SignUpPage from "./signUpPage";

function LoginPage() {
  return (
    
      <LoginForm />
    
  );
}

export default LoginPage;
