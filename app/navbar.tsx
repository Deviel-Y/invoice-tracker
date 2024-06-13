"use client";

import { Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TfiAgenda } from "react-icons/tfi";

const Navbar = () => {
  const currentPath = usePathname();

  const navLinks: { label: string; href: string }[] = [
    { label: "Dasboard", href: "/" },
    { label: "Invoices", href: "/invoice/list" },
  ];

  return (
    <nav className="border-b p-4 mb-5 ">
      <Flex justify={"between"}>
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

        <Text>LogIn / LogOut</Text>
      </Flex>
    </nav>
  );
};

export default Navbar;
