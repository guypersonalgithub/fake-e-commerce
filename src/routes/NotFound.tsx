import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="font-bold text-8xl">404</div>
      <div className="font-semibold text-2xl">Not found</div>
      <Link to="/" className="text-primary hover:underline font-medium">
        Back to home
      </Link>
    </div>
  );
};

