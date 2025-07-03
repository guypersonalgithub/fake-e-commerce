import { Link } from "react-router";
import { Logo } from "./Logo";
import { useAuthStore } from "@/globalStores";
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
        <nav className="flex items-center space-x-6 text-sm">
          <UserDropdown />
        </nav>
      </div>
    </header>
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

  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
    </>
  );
};

