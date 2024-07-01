"use client";

import CalloutAlert from "@/app/invoice/components/CalloutAlert";
import LoadingSpinner from "@/app/invoice/components/LoadingSpinner";
import ImageUploadButton from "@/app/invoice/components/UploadButton";
import {
  updateUserInfoSchema,
  updateUserInfoType,
} from "@/app/schemas/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  user: User;
}

const UserInfoForm = ({ user }: Props) => {
  const [isPasswordFieldActive, setPasswordFieldActive] =
    useState<boolean>(false);

  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateUserInfoType>({
    resolver: zodResolver(updateUserInfoSchema),
  });

  const router = useRouter();

  const userFirstname = session?.user?.name?.split(" ")[0];
  const userLastname = session?.user?.name?.split(" ")[1];

  const submitHandler = handleSubmit((data) => {
    axios
      .patch(`/api/user/${user.id}`, data)
      .then(async () => {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: `${data.firstname} ${data.lastname}`,
          },
        });
      })
      .then(() => {
        router.push("/");
        router.refresh();
      })
      .catch((res) => toast.error(res.response?.data));
  });

  return (
    <form onSubmit={submitHandler}>
      <Card>
        <Heading mb="8" size="7" as="h1">
          User Info
        </Heading>
        <Flex direction="column" gap="5">
          <ImageUploadButton user={user} />
          <Box>
            <TextField.Root
              {...register("firstname")}
              defaultValue={userFirstname}
              size="3"
              className="!transition-all"
              type="text"
              placeholder="First Name"
            />
            {errors.firstname && (
              <CalloutAlert>{errors.firstname.message}</CalloutAlert>
            )}
          </Box>
          <Box>
            <TextField.Root
              {...register("lastname")}
              defaultValue={userLastname}
              size="3"
              className="!transition-all"
              type="text"
              placeholder="Last Name"
            />
            {errors.lastname && (
              <CalloutAlert>{errors.lastname.message}</CalloutAlert>
            )}
          </Box>
          <Flex gap="3" align="center" mt="5">
            <Checkbox
              onClick={() => setPasswordFieldActive(!isPasswordFieldActive)}
            />
            <Text>I&apos;d Like to change my password</Text>
          </Flex>
          <Box>
            <TextField.Root
              {...register("currentPassword")}
              size="3"
              className="!transition-all"
              disabled={!isPasswordFieldActive}
              type="password"
              placeholder="Current password"
            />
            {errors.currentPassword && (
              <CalloutAlert>{errors.currentPassword.message}</CalloutAlert>
            )}
          </Box>

          <Box>
            <TextField.Root
              {...register("newPassword")}
              size="3"
              className="!transition-all"
              disabled={!isPasswordFieldActive}
              type="password"
              placeholder="New password"
            />
            {errors.newPassword && (
              <CalloutAlert>{errors.newPassword.message}</CalloutAlert>
            )}
          </Box>

          <Flex gap="5" align="center">
            <Button
              disabled={isSubmitting}
              className="!transition-all !cursor-pointer"
              size="3"
            >
              {isSubmitting && <LoadingSpinner />} Update
            </Button>
            <Button
              className="!transition-all !cursor-pointer"
              size="3"
              variant="ghost"
              color="red"
              onClick={(event) => {
                event.preventDefault();
                router.push("/");
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
        <Toaster />
      </Card>
    </form>
  );
};

export default UserInfoForm;
