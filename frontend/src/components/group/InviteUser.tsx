import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { LuCheckCircle } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { FieldValues, useForm } from "react-hook-form";
import { inviteUser } from "@/api/User";

type InviteUserProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  groupId: number;
};

const InviteUser: React.FC<InviteUserProps> = ({
  isOpen,
  setIsOpen,
  groupId,
}) => {
  const { toast } = useToast();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen === false) {
      setError("");
      reset();
    }
  }, [isOpen]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await inviteUser({ email: data.email, groupId: groupId });
      if (!result.success) {
        setError(result.message);
        return;
      }
      setIsOpen(false);
      toast({
        variant: "positive",
        description: (
          <div className="flex items-center gap-2">
            <LuCheckCircle size={22} />
            User has been invited to group.
          </div>
        ),
      });
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
              {isSubmitting ? "Loading..." : "Send request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
