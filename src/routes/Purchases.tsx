import { Card, CardContent } from "@/components/ui/Card";
import { ProductCart } from "@/components/ui/productCart/ProductCart";
import { QueryStateWrapper } from "@/components/ui/QueryStateWrapper";
import { useStore } from "@/stores/globalStores";
import type { CachedCartItems } from "@/stores/types";
import { GET_PRODUCTS, type Product } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";

const getUserPurchases = (userPurchases: string, username: string) => {
  try {
    const purchases = JSON.parse(userPurchases) as CachedCartItems[];
    return purchases.filter((userPurchase) => userPurchase.username === username);
  } catch {
    return [];
  }
};

export const Purchases = () => {
  const { data = [], isLoading, isError } = useQuery(GET_PRODUCTS);

  return (
    <QueryStateWrapper isLoading={isLoading} isError={isError}>
      <PurchasesView data={data} />
    </QueryStateWrapper>
  );
};

type PurchasesViewProps = {
  data: Product[];
};

const PurchasesView = ({ data }: PurchasesViewProps) => {
  const username = useStore((state) => state.username);
  const userPurchases = localStorage.getItem("purchases");

  if (!userPurchases || !username) {
    return <NoPurchases />;
  }

  const currentUserPurchases = getUserPurchases(userPurchases, username);

  if (currentUserPurchases.length === 0) {
    return <NoPurchases />;
  }

  return (
    <div className="grid gap-10">
      {currentUserPurchases.map((currentUserPurchase, index) => {
        return (
          <ProductCart key={index} cartItems={currentUserPurchase.cartItems} products={data} />
        );
      })}
    </div>
  );
};

const NoPurchases = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          You haven't purchased any products previously
        </h3>
      </CardContent>
    </Card>
  );
};

