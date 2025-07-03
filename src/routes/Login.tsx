import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { useAuthStore, useProductStore } from "@/stores/globalStores";

type Credentials = {
  username: string;
  password: string;
};

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const initializeCartOnLogin = useProductStore((state) => state.initializeCartOnLogin);
  const redirectToAfterLogin = useAuthStore((state) => state.redirectToAfterLogin);
  const navigate = useNavigate();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (credentials: Credentials) =>
      await fetchWrapper<{ token: string }, Credentials>("/auth/login", {
        method: "POST",
        body: credentials,
        errorMessage: "Login failed",
      }),
    onSuccess: (data, variables) => {
      login(variables.username, data.token);
      initializeCartOnLogin();
      navigate(redirectToAfterLogin ?? "/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit((data) => mutate(data))}>
              <Input
                id="username"
                type="username"
                {...register("username", { required: true, minLength: 6 })}
                label="Username"
                error={errors.username ? "Username must be at least 6 characters" : undefined}
              />
              <Input
                id="password"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                label="Password"
                error={errors.password ? "Password must be at least 6 characters" : undefined}
              />
              <Button type="submit" className="w-full" isLoading={isPending}>
                Sign in
              </Button>
              <ErrorMessage error={error?.message} />
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-muted-foreground w-full">
              <div>
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

