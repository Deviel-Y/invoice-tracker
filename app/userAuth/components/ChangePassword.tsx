import {
  Button,
  Flex,
  Heading,
  Popover,
  Text,
  TextField,
} from "@radix-ui/themes";
import { AiFillLock, AiOutlineLock } from "react-icons/ai";

interface Props {
  triggerText: string;
}

const ChangePassword = ({ triggerText }: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="!w-52 cursor-pointer text-blue-300 hover:text-blue-400 transition-all">
        <Text>{triggerText}</Text>
      </Popover.Trigger>

      <Popover.Content size="3">
        <Flex gap="3" direction={"column"}>
          <Heading as="h2" size="4" mb="3">
            Change Password
          </Heading>
          <TextField.Root
            type="password"
            className="!transition-all w-80 "
            radius="full"
            placeholder="Current Password"
          >
            <TextField.Slot>
              <AiFillLock />
            </TextField.Slot>
          </TextField.Root>

          <TextField.Root
            type="password"
            className="!transition-all w-80"
            radius="full"
            placeholder="New Password"
          >
            <TextField.Slot>
              <AiOutlineLock />
            </TextField.Slot>
          </TextField.Root>

          <Flex gap="3">
            <Button
              className="!cursor-pointer !transition-all"
              radius="full"
              color="red"
            >
              Check
            </Button>

            <Button
              className="!cursor-pointer !transition-all"
              radius="full"
              color="blue"
            >
              Change Password
            </Button>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default ChangePassword;
