import type { UseProductStoreProps } from "@/stores/globalStores";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../Card";
import { ShoppingBag, Trash2 } from "lucide-react";
import type { Product } from "@/utils/requests";
import { Button } from "../Button";
import { QuantityInput } from "../QuantityInput";
import { EmptyCart } from "./EmptyCart";

type ProductCartProps = Pick<UseProductStoreProps, "cartItems"> &
  Partial<Pick<UseProductStoreProps, "updateCurrentCart" | "checkout">> & {
    products: Product[];
  };

export const ProductCart = ({
  cartItems,
  updateCurrentCart,
  checkout,
  products,
}: ProductCartProps) => {
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const cartProducts = cartItems
    .map((cartItem) => {
      const { productId, quantity } = cartItem;
      return {
        product: products.find((product) => product.id === productId),
        quantity,
      };
    })
    .filter((cartProduct) => cartProduct.product) as { product: Product; quantity: number }[];

  const total = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartProducts.map((item) => {
          const { product, quantity } = item;

          return (
            <div key={product.id} className="flex items-center space-x-4 py-4">
              <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                <img src={product.image} alt={product.title} className="object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium leading-none">{product.title}</h3>
                <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
              </div>
              {updateCurrentCart ? (
                <QuantityInput
                  initialValue={quantity}
                  onChange={(value) => updateCurrentCart(product.id, value)}
                />
              ) : null}
              <div className="text-right w-[80px]">
                <p className="font-medium">${(product.price * item.quantity).toFixed(2)}</p>
                {updateCurrentCart ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => updateCurrentCart(product.id, 0)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex-col space-y-4 pt-6">
        <div className="w-full space-y-2">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        {checkout ? (
          <Button className="w-full" onClick={checkout}>
            Checkout
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

