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
import { Textarea } from "../ui/textarea";
import { createNewList } from "@/api/User";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const AddNewList = ({ handleNewItem }: any) => {
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
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const createListMutation = useMutation({
    mutationFn: createNewList,
    onError: error => {
      console.error("Error adding new list:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: FieldValues) => {
    createListMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-1">
          <LuPlus />
          Add new list
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>New list</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 30,
                    message: "Maximum length of the name is 30 characters",
                  },
                })}
                placeholder="List name..."
                className="col-span-3"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm grid-cols-4 text-end">{`${errors.name.message}`}</p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea
                {...register("description")}
                placeholder="Description..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              Create list
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewList;
