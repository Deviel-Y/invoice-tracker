"use client";

import { create } from "zustand";
import { ProductStoreType } from "./validationSchemas";

interface ProductStore {
  products: ProductStoreType[];

  addProduct: (product: ProductStoreType) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((store) => ({ products: [...store.products, product] })),
}));

export default useProductStore;
