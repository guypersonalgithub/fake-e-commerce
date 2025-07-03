import { Link } from "react-router";
import { Card, CardContent } from "../Card";
import { ShoppingBag } from "lucide-react";
import { Button } from "../Button";

export const EmptyCart = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">Add some items to get started</p>
        <Link to="/products">
          <Button>To products</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

