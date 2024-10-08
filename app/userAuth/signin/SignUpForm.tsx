"use client";

import CalloutAlert from "@/app/invoice/components/CalloutAlert";
import LoadingSpinner from "@/app/invoice/components/LoadingSpinner";
import {
  signUpSchema,
  SignUpUserType,
} from "@/app/schemas/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineKey,
  AiOutlineUser,
} from "react-icons/ai";

const SignUpForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpUserType>({
    resolver: zodResolver(signUpSchema),
  });

  const submitHandler = handleSubmit(({ confirmPassword, email, password }) =>
    axios
      .post<SignUpUserType>("/api/user/", {
        confirmPassword,
        email,
        password,
      })
      .then(() =>
        signIn("credentials", {
          email,
          password,
        })
      )
      .catch((res) => toast.error(res.response?.data))
  );

  return (
    <>
      <form onSubmit={submitHandler}>
        <Card>
          <Flex p="3" gap="6" direction="column">
            <Heading size="8" align="center">
              Sign Up
            </Heading>

            <Box>
              <TextField.Root
                {...register("email")}
                className="!transition-all"
                radius="full"
                size="3"
                type="email"
                placeholder="Email Address"
              >
                <TextField.Slot>
                  <AiOutlineUser />
                </TextField.Slot>
              </TextField.Root>
              {errors.email && (
                <CalloutAlert>{errors.email.message}</CalloutAlert>
              )}
            </Box>

            <Flex direction="column" gap="2">
              <TextField.Root
                {...register("password")}
                className="!transition-all"
                radius="full"
                size="3"
                type={!isPasswordVisible ? "password" : "text"}
                placeholder="Create Password"
              >
                <TextField.Slot>
                  <AiOutlineKey />
                </TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    onClick={() => setPasswordVisible(!isPasswordVisible)}
                    variant="ghost"
                    type="button"
                    radius="full"
                    className="!transition-all !cursor-pointer"
                  >
                    {!isPasswordVisible ? (
                      <AiFillEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
              {errors.password && (
                <CalloutAlert>{errors.password.message}</CalloutAlert>
              )}
            </Flex>

            <Flex direction="column" gap="2">
              <TextField.Root
                {...register("confirmPassword")}
                className="!transition-all"
                radius="full"
                size="3"
                type={!isPasswordConfirmVisible ? "password" : "text"}
                placeholder="Confirm Password"
              >
                <TextField.Slot>
                  <AiOutlineKey />
                </TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    onClick={() =>
                      setPasswordConfirmVisible(!isPasswordConfirmVisible)
                    }
                    variant="ghost"
                    type="button"
                    radius="full"
                    className="!transition-all !cursor-pointer"
                  >
                    {!isPasswordConfirmVisible ? (
                      <AiFillEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
              {errors.confirmPassword && (
                <CalloutAlert>{errors.confirmPassword.message}</CalloutAlert>
              )}
            </Flex>

            <Button
              disabled={isSubmitting}
              radius="full"
              size="3"
              className="!transition-all !cursor-pointer"
            >
              {isSubmitting && <LoadingSpinner />}
              Continue
            </Button>
          </Flex>
        </Card>
      </form>
      <Toaster />
    </>
  );
};

export default SignUpForm;
