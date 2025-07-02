import { Link } from "react-router";
import { Logo } from "./Logo";
import { useAuthStore } from "@/store";

export const Header = () => {
  const username = useAuthStore((state) => state.username);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="ml-2 mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {!username ? (
              <Link
                to="/login"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Login
              </Link>
            ) : (
              <div>Hello, {username}</div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

