import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { loginUser } from "@/api/User";
import { auth } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      const usersettings = await loginUser({
        email: data.email,
        password: data.password,
      });
      if (!usersettings.success) {
        setError(usersettings.message);
        return;
      }
      if (usersettings.token) {
        auth(usersettings.token);
        return;
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
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
          Log in
        </Button>
        <p className="text-sm text-muted-foreground -mt-3 text-red-500">
          {error}
        </p>
      </form>
    </div>
  );
};

export default Login;
