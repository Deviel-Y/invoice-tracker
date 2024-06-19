"use client";

import { Box, Container, Flex, SegmentedControl } from "@radix-ui/themes";
import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const SegmentedAuthentication = () => {
  const [segment, setSegment] = useState<"signIn" | "signUp">("signIn");

  const authenticateSegments: { label: string; value: "signIn" | "signUp" }[] =
    [
      { label: "Sign In", value: "signIn" },
      { label: "Sign Up", value: "signUp" },
    ];

  return (
    <Flex justify="center">
      <Box width="50%">
        <Flex direction="column" gap="5">
          <SegmentedControl.Root size="3">
            {authenticateSegments.map((segment) => (
              <SegmentedControl.Item
                key={segment.value}
                value={segment.value}
                onClick={() => setSegment(segment.value)}
              >
                {segment.label}
              </SegmentedControl.Item>
            ))}
          </SegmentedControl.Root>
          {segment === "signIn" && <LogInForm />}
          {segment === "signUp" && <SignUpForm />}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SegmentedAuthentication;
