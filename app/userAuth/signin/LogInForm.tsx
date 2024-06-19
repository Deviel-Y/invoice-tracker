"use client";

import Link from "@/app/invoice/components/Link";
import {
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  TextField,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineKey,
  AiOutlineUser,
} from "react-icons/ai";

const LogInForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <form>
      <Card>
        <Flex p="3" gap="6" direction="column">
          <Heading size="8" align="center">
            Login
          </Heading>
          <TextField.Root
            radius="full"
            size="3"
            type="email"
            placeholder="Email Address"
          >
            <TextField.Slot>
              <AiOutlineUser />
            </TextField.Slot>
          </TextField.Root>

          <Flex direction="column" gap="2">
            <TextField.Root
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
                  {!isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            <Text align="right">Forgot your password?</Text>
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
