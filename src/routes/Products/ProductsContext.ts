import { createContext } from "react";
import { type StoreApi, type UseBoundStore } from "zustand";

export type ProdctContextStore = {
  isModalOpen: boolean;
  modalProductId?: number;
  setModalProductId: (modalProductId: number) => void;
  closeModal: () => void;
  deleteProductId: () => void;
};

export const ProductsContext = createContext<UseBoundStore<StoreApi<ProdctContextStore>> | null>(
  null,
);

