"use client";

import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TfiAgenda } from "react-icons/tfi";

const Navbar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const navLinks: { label: string; href: string }[] = [
    { label: "Dasboard", href: "/" },
    { label: "Invoices", href: "/invoice/list" },
  ];

  return (
    <nav className="border-b p-4 mb-5 ">
      <Flex justify="between" align="center">
        <ul>
          <Flex align={"center"} gap="5">
            <Link href="/">
              <TfiAgenda size={30} />
            </Link>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className={classNames({
                    "nav-link": true,
                    "font-medium !text-zinc-900": currentPath === link.href,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </Flex>
        </ul>

        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
        {status === "authenticated" && (
          <Text>
            Hi <UserInfo />
          </Text>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Text color="indigo" className="cursor-pointer">
          {session?.user?.name}
        </Text>
      </Popover.Trigger>

      <Popover.Content>
        <Flex gap="4" align="center">
          <Avatar
            size="4"
            src={session?.user?.image!}
            alt="Profile Picture"
            fallback="?"
            radius="full"
          />
          <Box>
            <Flex direction="column" gap="2" align="center">
              <Text color="gray">{session?.user?.email}</Text>
              <SignOutConfirmation />
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export const SignOutConfirmation = () => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          className="!transition-all !cursor-pointer"
          variant="soft"
          color="red"
        >
          Sign Out
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>SignOut Confirmation</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to sign out?
        </AlertDialog.Description>

        <Flex gap="4" justify="end" mt="5">
          <AlertDialog.Cancel>
            <Button
              color="gray"
              variant="outline"
              className="!transition-all !cursor-pointer"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button
              color="red"
              className="!transition-all !cursor-pointer"
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              Sign out
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
