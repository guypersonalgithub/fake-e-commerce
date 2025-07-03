import { Link } from "react-router";

export const AlreadyHaveAnAccount = () => {
  return (
    <div>
      Already have an account?{" "}
      <Link to="/login" className="text-primary hover:underline font-medium">
        Sign in
      </Link>
    </div>
  );
};

