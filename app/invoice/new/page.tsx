import { Grid } from "@radix-ui/themes";
import ProductForm from "../components/ProductForm";
import ProductListTable from "../components/ProductListTable";

const CreateNewInvoicePage = () => {
  return (
    <Grid columns="3" gap="5">
      <ProductForm />
      <ProductListTable />
    </Grid>
  );
};

export default CreateNewInvoicePage;
