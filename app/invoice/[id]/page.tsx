import prisma from "@/prisma/client";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import ProductListTable from "../components/ProductListTable";
import Link from "next/link";
import DeleteInvoiceButton from "./DeleteInvoiceButton";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const InvoiceDetailPage = async ({ params: { id } }: Props) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { products: true },
  });

  if (!invoice) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4">
        <ProductListTable
          variant="surface"
          productList={invoice?.products}
          showDeleteButton={false}
        />
      </Box>
      <Flex gap="3" direction={"column"}>
        <Button className="!transition-all !cursor-pointer">
          <Link href={`/invoice/edit/${invoice?.id}`}>Edit Invoice</Link>
        </Button>
        <DeleteInvoiceButton invoice={invoice} />
      </Flex>
    </Grid>
  );
};

export default InvoiceDetailPage;
