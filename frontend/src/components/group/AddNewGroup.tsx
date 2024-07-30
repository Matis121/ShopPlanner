import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { LuPlus } from "react-icons/lu";
import { FieldValues, useForm } from "react-hook-form";
import { CreateNewGroup } from "@/api/User";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type AddNewGroupProps = {
  buttonValue: string;
};

const AddNewGroup: React.FC<AddNewGroupProps> = ({ buttonValue }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open === false) {
      reset();
    }
  }, [open]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createGroupMutation = useMutation({
    mutationFn: CreateNewGroup,
    onError: error => {
      console.error("Error adding new list:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    createGroupMutation.mutate({ name: data.name });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-1">
          <LuPlus />
          {buttonValue}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>New group</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="List name..."
                className="col-span-3"
                maxLength={40}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm grid-cols-4 text-end">{`${errors.name.message}`}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={createGroupMutation.status === "pending"}
            >
              {createGroupMutation.status === "pending" ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </div>
              ) : (
                "Create group"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewGroup;
