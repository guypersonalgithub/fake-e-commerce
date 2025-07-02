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

type Credentials = {
  email: string;
  username: string;
  password: string;
};

export const Signup = () => {
  const navigate = useNavigate();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (credentials: Credentials) =>
      await fetchWrapper<{ id: number }, Credentials>("/users", {
        method: "POST",
        body: credentials,
        errorMessage: "Signup failed",
      }),
    onSuccess: (data) => {
      console.log(data);
      navigate("/login");
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
            <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
            <CardDescription className="text-center">
              Enter an email and password to create your account
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
                id="email"
                type="email"
                placeholder="mail@example.com"
                {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                label="Email"
                error={errors.email ? "Must be a correct email format" : undefined}
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
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

