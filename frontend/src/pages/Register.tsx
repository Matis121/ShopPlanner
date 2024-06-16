import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { registerUser } from "@/api/User";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
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
        <Input {...register("email")} placeholder="e-mail" className="w-80" />
        <Input
          {...register("password")}
          placeholder="Password"
          className="w-80"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
          className=" self-end"
        >
          Create account
        </Button>
      </form>
    </div>
  );
};

export default Register;
