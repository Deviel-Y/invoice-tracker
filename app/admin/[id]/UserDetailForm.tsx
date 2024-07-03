"use client";

import CalloutAlert from "@/app/invoice/components/CalloutAlert";
import {
  updateUserInfoSchema,
  UpdateUserInfoType,
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
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  user: User;
}

const UserDetailForm = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInfoType>({
    resolver: zodResolver(updateUserInfoSchema),
  });
  const [isUserAdmin, setUserAdmin] = useState<boolean>(false);
  const [isPasswordFormDisable, setPasswordFormStatus] =
    useState<boolean>(false);

  return (
    <Card className="!p-5">
      <Heading mb="6" size="7">
        User&apos;s Profile Info
      </Heading>

      <form
        onSubmit={handleSubmit((data) => {
          console.log({ ...data, role: isUserAdmin });
        })}
      >
        <Flex direction="column" gap="5">
          <Flex gap="4" align="center">
            <Box>
              <Text as="label" size="3">
                First Name
              </Text>

              <TextField.Root
                {...register("firstname")}
                className="!transition-all"
                defaultValue={user.name?.split(" ")[0]}
                placeholder="John"
                size="3"
              />
              {errors.firstname && (
                <CalloutAlert>{errors.firstname.message}</CalloutAlert>
              )}
            </Box>

            <Box>
              <Text as="label" size="3">
                Last Name
              </Text>
              <TextField.Root
                {...register("lastname")}
                className="!transition-all"
                defaultValue={user.name?.split(" ")[1]}
                placeholder="Doe"
                size="3"
              />
              {errors.lastname && (
                <CalloutAlert>{errors.lastname.message}</CalloutAlert>
              )}
            </Box>

            <Text ml="5" as="label" size="3">
              <Flex align="end" gap="2">
                <Checkbox
                  checked={user.role === "ADMIN"}
                  onCheckedChange={(event) => {
                    setUserAdmin(!!event);
                  }}
                />
                Set As Admin
              </Flex>
            </Text>
          </Flex>

          <Box>
            <Text as="label" size="3">
              Email Address
            </Text>

            <TextField.Root
              {...register("email")}
              className="!transition-all"
              defaultValue={user.email!}
              placeholder="John@example.com"
              size="3"
              type="email"
            />
            {errors.email && (
              <CalloutAlert>{errors.email.message}</CalloutAlert>
            )}
          </Box>

          <Flex>
            <Box>
              <Text as="label" size="3">
                Password
              </Text>

              <TextField.Root
                {...register("newPassword")}
                disabled={isPasswordFormDisable}
                className="!transition-all"
                placeholder="User's Password"
                size="3"
                type="password"
              />
              {errors.newPassword && (
                <CalloutAlert>{errors.newPassword.message}</CalloutAlert>
              )}
            </Box>

            <Text ml="5" as="label" size="3">
              <Flex align="end" gap="2">
                <Checkbox
                  onCheckedChange={(event) => {
                    setPasswordFormStatus(!!event);
                  }}
                />
                Set As Admin
              </Flex>
            </Text>
          </Flex>

          <Flex gap="4">
            <Button
              type="submit"
              className="!transition-all !cursor-pointer"
              size="3"
            >
              Update User&apos;s Profile
            </Button>

            <Button
              type="button"
              className="!transition-all !cursor-pointer"
              size="3"
              color="red"
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default UserDetailForm;
