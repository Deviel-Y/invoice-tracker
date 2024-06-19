"use client";

import CalloutAlert from "@/app/invoice/components/Callout";
import Link from "@/app/invoice/components/Link";
import { userSchema, UserType } from "@/app/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  TextField,
  Text,
  Box,
} from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineKey,
  AiOutlineUser,
} from "react-icons/ai";

const LogInForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        signIn("credentials", { email: data.email, password: data.password });
      })}
    >
      <Card>
        <Flex p="3" gap="6" direction="column">
          <Heading size="8" align="center">
            Login
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
            <Box>
              <TextField.Root
                {...register("password")}
                className="!transition-all"
                radius="full"
                size="3"
                type={!isPasswordVisible ? "password" : "text"}
                placeholder="Password"
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
            </Box>
            <Text align="right">Forgot your password ?</Text>
          </Flex>

          <Button
            radius="full"
            size="3"
            className="!transition-all !cursor-pointer"
          >
            Continue
          </Button>

          <Text align="center">
            Don't have an account ? <Link href="/">Register</Link>
          </Text>
        </Flex>
      </Card>
    </form>
  );
};

export default LogInForm;
