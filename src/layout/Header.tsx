import { Link } from "react-router";
import { Logo } from "./Logo";
import { useAuthStore, useProductStore } from "@/globalStores";
import { AlreadyHaveAnAccount } from "@/components/ui/AlreadyHaveAnAccount";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between w-full h-14 items-center px-4">
        <div className="flex gap-4">
          <Link to="/" className="mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/products"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Products
            </Link>
          </nav>
        </div>
        <nav className="flex items-center space-x-4 text-sm">
          <ToCart />
          <UserDropdown />
        </nav>
      </div>
    </header>
  );
};

const ToCart = () => {
  return (
    <Link to="/cart">
      <Button variant="ghost" className="relative">
        <ToCartBadge />
        <ShoppingCart />
      </Button>
    </Link>
  );
};

const ToCartBadge = () => {
  const cartItems = useProductStore((state) => state.cartItems);
  const cartItemsCount = cartItems.length;

  if (cartItemsCount === 0) {
    return null;
  }

  return (
    <Badge variant="destructive" className="rounded-full w-5 h-5 absolute -top-1 -right-1">
      {cartItemsCount}
    </Badge>
  );
};

const UserDropdown = () => {
  const username = useAuthStore((state) => state.username);

  if (!username) {
    return <AlreadyHaveAnAccount />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer focus:outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <UserDropdownContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdownContent = () => {
  const logout = useAuthStore((state) => state.logout);
  const emptyCart = useProductStore((state) => state.emptyCart);

  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <Link to="/purchases">
        <DropdownMenuItem>Purchases</DropdownMenuItem>
      </Link>
      <DropdownMenuItem
        onClick={() => {
          logout();
          emptyCart();
        }}
      >
        Logout
      </DropdownMenuItem>
    </>
  );
};

