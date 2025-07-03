import { ProductCart } from "@/components/ui/productCart/ProductCart";
import { Spinner } from "@/components/ui/Spinner";
import { useProductStore } from "@/stores/globalStores";
import { GET_PRODUCTS } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";

export const Cart = () => {
  const cartItems = useProductStore((state) => state.cartItems);
  const updateCurrentCart = useProductStore((state) => state.updateCurrentCart);
  const checkout = useProductStore((state) => state.checkout);
  const { data = [], isLoading, isError } = useQuery(GET_PRODUCTS);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        Something went wrong, please refresh and try again
      </div>
    );
  }

  return (
    <ProductCart
      cartItems={cartItems}
      updateCurrentCart={updateCurrentCart}
      checkout={checkout}
      products={data}
    />
  );
};

