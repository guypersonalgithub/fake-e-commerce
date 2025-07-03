import { type ReactNode } from "react";
import { create } from "zustand";
import { ProductsContext, type ProdctContextStore } from "./ProductsContext";
import { useGetParamsOnLoad } from "@/hooks/useGetParamsOnLoad";
import { addQueryParamsSilently, removeQueryParamsSilently } from "@/utils/silentQueryParams";

type ProductsContextProviderProps = {
  children: ReactNode;
};

export const ProductsContextProvider = ({ children }: ProductsContextProviderProps) => {
  const { modal } = useGetParamsOnLoad(["modal"]);
  const modalIsOpen = modal !== undefined;

  const store = create<ProdctContextStore>((set) => ({
    isModalOpen: modalIsOpen,
    modalProductId: modalIsOpen ? Number(modal) : undefined,
    setModalProductId: (modalProductId) =>
      set(() => {
        addQueryParamsSilently([{ key: "modal", value: String(modalProductId) }]);
        return { isModalOpen: true, modalProductId };
      }),
    closeModal: () =>
      set(() => {
        removeQueryParamsSilently(["modal"]);
        return { isModalOpen: false };
      }),
    deleteProductId: () => set(() => ({ modalProductId: undefined })),
  }));

  return <ProductsContext.Provider value={store}>{children}</ProductsContext.Provider>;
};

