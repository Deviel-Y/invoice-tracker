import CalloutAlert from "@/app/invoice/components/CalloutAlert";
import {
  ForgetPasswordSchemaType,
  forgetPasswordSchema,
} from "@/app/schemas/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiFillLock, AiOutlineLock, AiOutlineMail } from "react-icons/ai";

interface Props {
  triggerText: string;
}

const ChangePassword = ({ triggerText }: Props) => {
  const router = useRouter();

  const [doesEmailExist, setEmailExist] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const checkUserExistence = handleSubmit((data) =>
    axios
      .post("/api/user/forgetPassword", { email: data.email })
      .then((res) => setEmailExist(res.data))
  );

  const resetPassword = handleSubmit((data) => {
    axios
      .post("/api/user/resetPassword", data)
      .then(() => {
        toast.success(`Password of ${data.email} has been reset`);
      })
      .then(() => {
        signIn("credentials", {
          email: data.email,
          password: data.confirmPassword,
        });
        router.push("/");
      });
  });

  return (
    <>
      <Popover.Root>
        <Popover.Trigger className="!w-52 cursor-pointer text-blue-300 hover:text-blue-400 transition-all">
          <Text>{triggerText}</Text>
        </Popover.Trigger>

        <Popover.Content size="3">
          <Flex gap="3" direction={"column"}>
            <Heading as="h2" size="4" mb="3">
              Change Password
            </Heading>

            <Box mb="3">
              <TextField.Root
                {...register("email")}
                type="email"
                className="!transition-all w-80"
                radius="full"
                placeholder="Email Address"
              >
                <TextField.Slot>
                  <AiOutlineMail />
                </TextField.Slot>
              </TextField.Root>
              {errors.email && (
                <CalloutAlert>{errors?.email?.message}</CalloutAlert>
              )}
            </Box>

            <Box>
              <TextField.Root
                {...register("newPassword")}
                disabled={!doesEmailExist}
                type="password"
                className="!transition-all w-80 "
                radius="full"
                placeholder="new Password"
              >
                <TextField.Slot>
                  <AiFillLock />
                </TextField.Slot>
              </TextField.Root>
              {errors.newPassword && (
                <CalloutAlert>{errors?.newPassword?.message}</CalloutAlert>
              )}
            </Box>

            <Box>
              <TextField.Root
                {...register("confirmPassword")}
                disabled={!doesEmailExist}
                type="password"
                className="!transition-all w-80"
                radius="full"
                placeholder="Confirm Password"
              >
                <TextField.Slot>
                  <AiOutlineLock />
                </TextField.Slot>
              </TextField.Root>
              {errors.confirmPassword && (
                <CalloutAlert>{errors?.confirmPassword?.message}</CalloutAlert>
              )}
            </Box>

            <Flex gap="3">
              <Button
                onClick={checkUserExistence}
                className="!cursor-pointer !transition-all"
                radius="full"
                color="red"
              >
                Check
              </Button>

              <Button
                onClick={resetPassword}
                disabled={!doesEmailExist}
                className={`!cursor-pointer !transition-all ${
                  !doesEmailExist && "!cursor-not-allowed"
                }`}
                radius="full"
                color="blue"
              >
                Change Password
              </Button>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
      <Toaster />
    </>
  );
};

export default ChangePassword;
