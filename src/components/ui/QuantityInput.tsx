import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "./Button";

type QuantityInputProps = {
  initialValue?: number;
  onChange: (quantity: number) => void;
};

export const QuantityInput = ({ initialValue = 0, onChange }: QuantityInputProps) => {
  const [quantity, setQuantity] = useState(initialValue);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
    onChange(quantity);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity === 0}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center text-sm">{quantity}</span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-transparent"
        onClick={() => updateQuantity(quantity + 1)}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

