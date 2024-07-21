import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { registerUser } from "@/api/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState("");

  // ZOD WITH REACT HOOK FORM
  const registerSchema = z
    .object({
      username: z.string().min(5).max(15),
      email: z.string().email(),
      password: z.string().min(6).max(30),
      confirmPassword: z.string().min(6).max(30),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      const register = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (!register.success) {
        setError(register.error);
        return;
      }
      toast({
        title: "Success!",
        description: "Your account has been created.",
        variant: "positive",
      });
      setError("");
      reset();
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <section className="relative">
      <Button
        variant="link"
        className="absolute top-4 right-8 text-lg"
        onClick={() => navigate({ to: "/login" })}
      >
        Login
      </Button>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
        <h2 className=" text-xl">Register page</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 shadow-xl rounded-xl py-4 px-8"
        >
          <Input
            {...register("username")}
            placeholder="username"
            className="w-80"
          />
          {errors.username && (
            <p className="text-sm text-muted-foreground -mt-3 text-red-500">
              {errors.username.message}
            </p>
          )}
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
          <Input
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-80"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-muted-foreground -mt-3 text-red-500">
              {errors.confirmPassword.message}
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
              "Create account"
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-red-500">{error}</p>
        </form>
      </div>
    </section>
  );
};

export default Register;
