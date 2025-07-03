import { ProductCart } from "@/components/ui/productCart/ProductCart";
import { QueryStateWrapper } from "@/components/ui/QueryStateWrapper";
import { useStore } from "@/stores/globalStores";
import { GET_PRODUCTS } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";

export const Cart = () => {
  const cartItems = useStore((state) => state.cartItems);
  const updateCurrentCart = useStore((state) => state.updateCurrentCart);
  const checkout = useStore((state) => state.checkout);
  const { data = [], isLoading, isError } = useQuery(GET_PRODUCTS);

  return (
    <QueryStateWrapper isLoading={isLoading} isError={isError}>
      <ProductCart
        cartItems={cartItems}
        updateCurrentCart={updateCurrentCart}
        checkout={checkout}
        products={data}
      />
    </QueryStateWrapper>
  );
};

