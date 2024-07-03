"use client";

import { User } from "@prisma/client";
import {
  Box,
  Flex,
  TextField,
  Text,
  Button,
  Card,
  Heading,
  Checkbox,
} from "@radix-ui/themes";

interface Props {
  user: User;
}

const UserDetailForm = ({ user }: Props) => {
  return (
    <Card className="!p-5">
      <Heading mb="6" size="7">
        User&apos;s Profile Info
      </Heading>

      <form>
        <Flex direction="column" gap="5">
          <Flex gap="4" align="center">
            <Box>
              <Text as="label" size="3">
                First Name
              </Text>

              <TextField.Root
                className="!transition-all"
                defaultValue={user.name?.split(" ")[0]}
                placeholder="John"
                size="3"
              />
            </Box>

            <Box>
              <Text as="label" size="3">
                Last Name
              </Text>
              <TextField.Root
                className="!transition-all"
                defaultValue={user.name?.split(" ")[1]}
                placeholder="Doe"
                size="3"
              />
            </Box>

            <Text ml="5" as="label" size="3">
              <Flex align="end" gap="2">
                <Checkbox className="!transition-all" />
                Set As Admin
              </Flex>
            </Text>
          </Flex>

          <Box>
            <Text as="label" size="3">
              Email Address
            </Text>

            <TextField.Root
              className="!transition-all"
              defaultValue={user.email!}
              placeholder="John@example.com"
              size="3"
              type="email"
            />
          </Box>

          <Box>
            <Text as="label" size="3">
              Password
            </Text>

            <TextField.Root
              className="!transition-all"
              placeholder="User's Password"
              size="3"
              type="password"
            />
          </Box>

          <Flex gap="4">
            <Button className="!transition-all !cursor-pointer" size="3">
              Update User&apos;s Profile
            </Button>

            <Button
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
