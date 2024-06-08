"use client";

import { create } from "zustand";
import { ProductStoreType, ProductType } from "./validationSchemas";

interface ProductStore {
  products: ProductStoreType[];
  totalPrice: number;

  addProduct: (product: ProductStoreType) => void;
  setTotalPrice: (price: number) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((store) => ({ products: [...store.products, product] })),

  totalPrice: 0,
  setTotalPrice: (price) =>
    set({
      totalPrice: price,
    }),
}));

export default useProductStore;
