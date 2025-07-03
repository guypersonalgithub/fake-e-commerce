import type { Product } from "@/utils/requests";
import { Card, CardContent, CardFooter, CardHeader } from "../Card";
import { Star } from "lucide-react";
import { formatTitleCase } from "@/utils/formatTitleCase";
import { Button } from "../Button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/utils/cn";
import { useProductsContext } from "@/routes/Products/useProductsContext";

type ProductCardProps = {
  className?: string;
  product: Product;
  isOrderable?: boolean;
};

export const ProductCard = ({ className, product, isOrderable }: ProductCardProps) => {
  const useStore = useProductsContext();
  const setModalProductId = useStore((state) => state.setModalProductId);
  const { category, description, image, price, rating, title } = product;
  const { rate, count } = rating;

  return (
    <Card className={cn("w-full max-w-sm overflow-hidden", className)}>
      <CardHeader className="p-0">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-64 object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <p className="text-sm">{formatTitleCase(category)}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({count} reviews)</span>
          </div>
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
        </div>
      </CardContent>
      {isOrderable ? (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button className="flex-1" onClick={() => setModalProductId(product.id)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
};

