import prisma from "@/prisma/client";
import { Box, Container, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ProductListTable from "../components/ProductListTable";
import DeleteInvoiceButton from "./DeleteInvoiceButton";
import EditInvoiceButton from "./EditInvoiceButton";
import InvoiceInfo from "./InvoiceInfo";

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
    <>
      <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
        <Box className="md:col-span-4">
          <InvoiceInfo invoice={invoice} />
          <ProductListTable
            variant="surface"
            productList={invoice?.products}
            showDeleteButton={false}
          />
        </Box>
        <Flex gap="3" direction={"column"}>
          <EditInvoiceButton invoiceId={invoice.id} />
          <DeleteInvoiceButton invoiceId={invoice.id} />
        </Flex>
      </Grid>
    </>
  );
};

export default InvoiceDetailPage;