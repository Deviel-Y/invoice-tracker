import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import InvoiceInfoForm from "../../components/InvoiceInfoForm";
import ProductListTable from "../../components/ProductListTable";
import { Box, Flex, Grid } from "@radix-ui/themes";
import ProductForm from "../../components/ProductForm";

interface Props {
  params: { id: string };
}

const EditInvoicePage = async ({ params: { id } }: Props) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { products: true },
  });

  if (!invoice) notFound();

  return (
    <Flex direction="column" gap="5">
      <Box>
        <InvoiceInfoForm invoice={invoice} />
      </Box>
      <Grid gap="5" columns={"3"}>
        <ProductForm />
        <ProductListTable productList={invoice.products} />
      </Grid>
    </Flex>
  );
};

export default EditInvoicePage;
