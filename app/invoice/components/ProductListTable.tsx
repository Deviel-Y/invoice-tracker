"use client";

import formatNumber from "@/app/formatNumber";
import useProductStore from "@/app/store";
import { ProductType } from "@/app/validationSchemas";
import { Invoice, Product } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { useEffect } from "react";

interface Props {
  productList?: ProductType[];
}

const ProductListTable = ({ productList }: Props) => {
  const tableColumns: {
    label: string;
    value: keyof Product | "Action Button" | "Total Price";
  }[] = [
    { label: "Product Name", value: "productName" },
    { label: "Quantity", value: "quantity" },
    { label: "Unit", value: "unit" },
    { label: "Price Per Each", value: "pricePerEach" },
    { label: "Total Price", value: "Total Price" },
    { label: "Action Button", value: "Action Button" },
  ];

  const products = useProductStore((s) => s.products);
  const deleteProduct = useProductStore((s) => s.deleteProduct);
  const addproductInArray = useProductStore((s) => s.addProductInArray);

  const totalPriceSum = products.reduce(
    (acc, sum) => acc + sum.productTotalPrice,
    0
  );

  if (productList) {
    useEffect(() => {
      const newProduct = productList?.map((product) => ({
        productTotalPrice: product.quantity * product.pricePerEach,
        ...product,
      }));

      addproductInArray(newProduct!);
    }, [addproductInArray]);
  }

  return (
    <>
      {products.length !== 0 && (
        <Table.Root className="col-span-2" variant="ghost">
          <Table.Header>
            <Table.Row>
              {tableColumns.map((column) => (
                <Table.ColumnHeaderCell key={column.value}>
                  {column.label}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products.map((product, index) => (
              <Table.Row key={index}>
                <Table.Cell>{product.productName}</Table.Cell>
                <Table.Cell>{formatNumber(product.quantity)}</Table.Cell>
                <Table.Cell>{product.unit}</Table.Cell>
                <Table.Cell>{`${formatNumber(
                  product.pricePerEach
                )} T`}</Table.Cell>
                <Table.Cell>
                  {`${formatNumber(product.pricePerEach * product.quantity)} T`}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="!transition-all !cursor-pointer"
                    onClick={() => deleteProduct(product.productName)}
                    variant="outline"
                    color="red"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Total :</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell colSpan={5}>
                {`${formatNumber(totalPriceSum)} T`}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
        </Table.Root>
      )}
    </>
  );
};

export default ProductListTable;
