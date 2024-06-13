"use client";

import formatNumber from "@/app/formatNumber";
import useProductStore from "@/app/store";
import { ProductType } from "@/app/invoiceValidationSchemas";
import { Invoice, Product } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { useEffect } from "react";

interface Props {
  productList?: ProductType[];
  showDeleteButton?: boolean;
  variant?: "ghost" | "surface" | undefined;
}

const ProductListTable = ({
  productList,
  showDeleteButton = true,
  variant = "ghost",
}: Props) => {
  const tableColumns: {
    label: string;
    value: keyof Product | "Action Button" | "Total Price";
    visibility?: boolean;
  }[] = [
    { label: "Product Name", value: "productName", visibility: true },
    { label: "Quantity", value: "quantity", visibility: true },
    { label: "Unit", value: "unit", visibility: true },
    { label: "Price Per Each", value: "pricePerEach", visibility: true },
    { label: "Total Price", value: "Total Price", visibility: true },
    {
      label: "Action Button",
      value: "Action Button",
      visibility: showDeleteButton,
    },
  ];

  const products = useProductStore((s) => s.products);
  const deleteProduct = useProductStore((s) => s.deleteProduct);
  const addproductInArray = useProductStore((s) => s.addProductInArray);

  useEffect(() => {
    if (productList) {
      const newProduct = productList?.map((product) => ({
        productTotalPrice: product.quantity * product.pricePerEach,
        ...product,
      }));

      addproductInArray(newProduct!);
    }
  }, [addproductInArray, productList]);

  const totalPriceSum = products.reduce(
    (acc, sum) => acc + sum.productTotalPrice,
    0
  );

  return (
    <>
      {products.length !== 0 && (
        <Table.Root className="col-span-2" variant={variant}>
          <Table.Header>
            <Table.Row>
              {tableColumns.map((column) => (
                <Table.ColumnHeaderCell align="center" key={column.value}>
                  {column.visibility && column.label}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products.map((product, index) => (
              <Table.Row key={index}>
                <Table.Cell align="center">{product.productName}</Table.Cell>
                <Table.Cell align="center">
                  {formatNumber(product.quantity)}
                </Table.Cell>
                <Table.Cell align="center">{product.unit}</Table.Cell>
                <Table.Cell align="center">{`${formatNumber(
                  product.pricePerEach
                )} T`}</Table.Cell>
                <Table.Cell align="center">
                  {`${formatNumber(product.pricePerEach * product.quantity)} T`}
                </Table.Cell>
                {showDeleteButton && (
                  <Table.Cell align="center">
                    <Button
                      className="!transition-all !cursor-pointer"
                      onClick={() => deleteProduct(product.productName)}
                      variant="outline"
                      color="red"
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                )}
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
