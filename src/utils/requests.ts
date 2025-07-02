import { fetchWrapper } from "./fetchWrapper";
import { formatTitleCase } from "./formatTitleCase";

export type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

export const GET_PRODUCTS = {
  queryKey: ["products"],
  queryFn: async () =>
    await fetchWrapper<Product[]>("/products", {
      method: "GET",
      errorMessage: "Failed to fetch products",
    }),
};

export const GET_CATEGORIES = {
  queryKey: ["categories"],
  queryFn: async () => {
    const categories = await fetchWrapper<string[]>("/products/categories", {
      method: "GET",
      errorMessage: "Failed to fetch product categories",
    });

    return [
      { value: "all", label: "All", filter: (products: Product[]) => products },
      ...categories.map((category) => {
        return {
          value: category,
          label: formatTitleCase(category),
          filter: (products: Product[]) =>
            products.filter((product) => product.category === category),
        };
      }),
    ];
  },
};

