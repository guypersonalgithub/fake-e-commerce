import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import { Button } from "../Button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/utils/requests";
import { ProductCard } from "./ProductCard";
import { useProductStore } from "@/stores/globalStores";
import { useProductsContext } from "@/routes/Products/useProductsContext";
import { useRef, type FormEvent } from "react";
import { QuantityInput } from "../QuantityInput";
import { Label } from "../Label";

type ProductCardDialogProps = {
  productsData: Product[];
};

export const ProductCardDialog = ({ productsData }: ProductCardDialogProps) => {
  const useStore = useProductsContext();
  const isModalOpen = useStore((state) => state.isModalOpen);
  const closeModal = useStore((state) => state.closeModal);
  const deleteProductId = useStore((state) => state.deleteProductId);
  const modalProductId = useStore((state) => state.modalProductId);
  const product = productsData.find((product) => product.id === modalProductId);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      {product ? (
        <DialogContent
          onAnimationEnd={() => {
            if (!isModalOpen) {
              deleteProductId();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Add {product.title} to cart</DialogTitle>
            <DialogDescription>
              Pick your desired amount and confirm in order to add {product.title} to your cart.
            </DialogDescription>
          </DialogHeader>
          <ProductCard className="max-w-max border-none shadow-none pt-6 pb-0" product={product} />
          <DialogFooter>
            <ProductCardForm product={product} closeDialog={() => closeModal()} />
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

type ProductCardFormProps = {
  product: Product;
  closeDialog: () => void;
};

const ProductCardForm = ({ product, closeDialog }: ProductCardFormProps) => {
  const cartItems = useProductStore((state) => state.cartItems);
  const updateCurrentCart = useProductStore((state) => state.updateCurrentCart);
  const currentProduct = cartItems.find(
    (currentProduct) => currentProduct.productId === product.id,
  );

  const valueRef = useRef<number>(currentProduct?.quantity ?? 0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCurrentCart(product.id, valueRef.current);
    closeDialog();
  };

  return (
    <form className="w-full space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <QuantityInput
          initialValue={valueRef.current}
          onChange={(value) => (valueRef.current = value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Confirm
        </Button>
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Close
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

