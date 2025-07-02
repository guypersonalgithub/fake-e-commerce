import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { Button } from "../Button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/utils/requests";
import { ProductCard } from "./ProductCard";
import { useForm } from "react-hook-form";
import { useProductStore } from "@/store";
import { SelectProductAmount } from "./SelectProductAmount";
import { options } from "./constants";
import { useState } from "react";

type OptionValues = (typeof options)[number]["value"];

type AddProductToCardProps =
  | {
      amount: Exclude<OptionValues, "custom">;
      customInputAmount?: never;
    }
  | {
      amount: Exclude<OptionValues, "1" | "2" | "3">;
      customInputAmount: number;
    };

type ProductCardDialogProps = {
  product: Product;
};

export const ProductCardDialog = ({ product }: ProductCardDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex w-full" asChild>
        <Button className="flex-1">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {product.title} to cart</DialogTitle>
          <DialogDescription>
            Pick your desired amount and confirm in order to add {product.title} to your cart.
          </DialogDescription>
        </DialogHeader>
        <ProductCard className="max-w-max border-none shadow-none pt-6 pb-0" product={product} />
        <DialogFooter>
          <ProductCardForm product={product} closeDialog={() => setIsOpen(false)} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type ProductCardFormProps = {
  product: Product;
  closeDialog: () => void;
};

const ProductCardForm = ({ product, closeDialog }: ProductCardFormProps) => {
  const currentCart = useProductStore((state) => state.currentCart);
  const updateCurrentCart = useProductStore((state) => state.updateCurrentCart);
  const currentProduct = currentCart.find(
    (currentProduct) => currentProduct.productId === product.id,
  );

  const { register, handleSubmit, watch, control, formState } = useForm<AddProductToCardProps>({
    defaultValues: (() => {
      if (!currentProduct) {
        return { amount: options[0].value };
      }

      const amount = String(currentProduct.amount);

      const amountExistsAsOption = options.find((option) => option.value === amount);
      if (amountExistsAsOption) {
        return { amount: amount as OptionValues };
      }

      return { amount: "custom", customInputAmount: currentProduct.amount };
    })(),
  });

  const onSubmit = (data: AddProductToCardProps) => {
    const { amount, customInputAmount } = data;
    const { id } = product;

    if (amount !== "custom") {
      updateCurrentCart(id, Number(amount));
      return closeDialog();
    }

    if (!customInputAmount) {
      return;
    }

    updateCurrentCart(id, customInputAmount);
    closeDialog();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <SelectProductAmount
        watch={watch}
        control={control}
        register={register}
        formState={formState}
      />
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

