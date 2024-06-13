"use client";

import { create } from "zustand";
import { ProductStoreType } from "./invoiceValidationSchemas";

interface ProductStore {
  products: ProductStoreType[];
  addProduct: (product: ProductStoreType) => void;
  addProductInArray: (products: ProductStoreType[]) => void;
  deleteProduct: (productName: string) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((store) => ({ products: [...store.products, product] })),

  deleteProduct: (productName) =>
    set((store) => ({
      products: store.products.filter(
        (product) => product.productName !== productName
      ),
    })),

  addProductInArray: (products) => set({ products: [...products] }),
}));
export default useProductStore;
