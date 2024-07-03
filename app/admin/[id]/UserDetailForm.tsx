"use client";

import CalloutAlert from "@/app/invoice/components/CalloutAlert";
import {
  updateUserInfoSchema,
  UpdateUserInfoType,
} from "@/app/schemas/userValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, User } from "@prisma/client";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { array } from "zod";

interface Props {
  user: User;
}

const UserDetailForm = ({ user }: Props) => {
  const userRoles: { label: string; value: Role }[] = [
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
  ];
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInfoType>({
    resolver: zodResolver(updateUserInfoSchema),
  });
  const [userRole, setUserRole] = useState<string>();
  const [isPasswordFormDisable, setPasswordFormStatus] =
    useState<boolean>(false);

  return (
    <Card className="!p-5">
      <Heading mb="6" size="7">
        User&apos;s Profile Info
      </Heading>

      <form
        onSubmit={handleSubmit((data) => {
          const userProfileInfo = { ...data, role: userRole };
          axios.patch(`/api/user/${user.id}`, userProfileInfo).then(() => {
            router.push("/admin");
            router.refresh();
          });
        })}
      >
        <Flex direction="column" gap="5">
          <Flex gap="4" align="center">
            <Flex direction="column" gap="1" flexGrow="1">
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
            </Flex>

            <Flex direction="column" gap="1" flexGrow="1">
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
            </Flex>

            <Flex direction="column" gap="1">
              <Text as="p" size="3">
                User&apos; Accessability
              </Text>
              <Select.Root
                size="3"
                defaultValue={user.role!}
                onValueChange={(value) => setUserRole(value)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    {userRoles.map((userRole) => (
                      <Select.Item key={userRole.value} value={userRole.value}>
                        {userRole.label}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Flex>

          <Flex direction="column" gap="1">
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
          </Flex>

          <Flex align="center">
            <Flex direction="column" gap="1" flexGrow="1">
              <Text as="label" size="3">
                Password
              </Text>

              <TextField.Root
                {...register("newPassword")}
                disabled={!isPasswordFormDisable}
                className="!transition-all"
                placeholder="User's Password"
                size="3"
                type="password"
              />
              {errors.newPassword && (
                <CalloutAlert>{errors.newPassword.message}</CalloutAlert>
              )}
            </Flex>

            <Text ml="5" as="label" size="3">
              <Flex mt="5" align="end" gap="2">
                <Checkbox
                  onCheckedChange={(event) => {
                    setPasswordFormStatus(!!event);
                  }}
                />
                Change User&apos;s Password
              </Flex>
            </Text>
          </Flex>

          <Flex gap="5" mt="4">
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
