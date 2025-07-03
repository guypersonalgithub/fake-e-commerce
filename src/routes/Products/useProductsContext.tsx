import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be used within a ProductsContextProvider");
  }

  return context;
};

