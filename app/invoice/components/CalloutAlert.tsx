import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const CalloutAlert = ({ children }: PropsWithChildren) => {
  return (
    <Callout.Root my="2" size="1" color="red" role="alert">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default CalloutAlert;
