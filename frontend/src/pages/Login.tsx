import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { loginUser } from "@/api/User";
import { auth } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      const usersettings = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log(usersettings);
      if (!usersettings.success) {
        console.log(usersettings);
        setError(usersettings.message);
      }
      if (usersettings.token) {
        auth(usersettings.token);
      }
      if (usersettings.success) {
        navigate({ to: "/" });
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <section className="relative">
      <Button
        variant="link"
        className="absolute top-4 right-8 text-lg"
        onClick={() => navigate({ to: "/register" })}
      >
        Register
      </Button>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col py-2 px-4 bg-green-500 dark:bg-green-300 bg-opacity-60 dark:bg-opacity-50 text-white border border-green-600 rounded-md">
          <span className="font-semibold mb-2 uppercase mx-auto">
            Test account
          </span>
          <p>Email: demo@gmail.com</p>
          <p>Password: demo12</p>
        </div>
        <h2 className=" text-xl">Login page</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 shadow-xl rounded-xl py-4 px-8"
        >
          <Input {...register("email")} placeholder="e-mail" className="w-80" />
          {errors.email && (
            <p className="text-sm text-muted-foreground -mt-3 text-red-500">
              {errors.email.message}
            </p>
          )}
          <Input
            {...register("password")}
            placeholder="Password"
            className="w-80"
            type="password"
          />
          {errors.password && (
            <p className="text-sm text-muted-foreground -mt-3 text-red-500">
              {errors.password.message}
            </p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="outline"
            className=" self-end"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </div>
            ) : (
              "Log in"
            )}
          </Button>
          <p className="text-sm text-muted-foreground -mt-3 text-red-500">
            {error}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
