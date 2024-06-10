"use client";

import { create } from "zustand";
import { ProductStoreType } from "./validationSchemas";

interface ProductStore {
  products: ProductStoreType[];
  addProduct: (product: ProductStoreType) => void;
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
}));
export default useProductStore;
