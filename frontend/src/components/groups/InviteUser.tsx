import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FieldValues, useForm } from "react-hook-form";
import { inviteUser } from "@/api/User";

const InviteUser = ({ isOpen, setIsOpen, groupId }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen === false) {
      reset();
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await inviteUser({ email: data.email, groupId: groupId });
      if (!result.success) {
        setError(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Invite user</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                E-mail:
              </Label>
              <Input
                {...register("email", {
                  required: "Name is required",
                  maxLength: {
                    value: 30,
                    message: "Maximum length of the name is 30 characters",
                  },
                })}
                className="col-span-3"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm grid-cols-4 text-end">{`${errors.name.message}`}</p>
            )}
            <p className="text-red-500 text-sm grid-cols-4 text-end">{`${error}`}</p>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Send request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
