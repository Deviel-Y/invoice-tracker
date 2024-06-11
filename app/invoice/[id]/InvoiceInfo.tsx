import { Invoice } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

interface Props {
  invoice: Invoice;
}

const InvoiceInfo = ({ invoice }: Props) => {
  return (
    <Card mb="5">
      <Heading mb="6" size="6">
        Invoice Details
      </Heading>
      <Flex direction="column" gap="5">
        <Flex gap="9">
          <Flex direction="column">
            <Text weight={"medium"}>Invoice Number</Text>
            <Text>{` ${invoice.invoiceNumber}`}</Text>
          </Flex>

          <Flex direction="column">
            <Text weight={"medium"}>Company Name</Text>
            <Text>{`${invoice.companyName}`}</Text>
          </Flex>

          <Flex direction="column">
            <Text weight={"medium"}>Created At</Text>
            <Text>{`${invoice.createdAt.toDateString()}`}</Text>
          </Flex>
        </Flex>

        <Flex direction="column">
          <Text weight={"medium"}>Invoice Description</Text>
          <Text>{`${invoice.invoiceDescription}`}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default InvoiceInfo;
