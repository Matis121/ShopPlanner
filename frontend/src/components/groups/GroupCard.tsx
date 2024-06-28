import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2, LuUserPlus } from "react-icons/lu";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "@/api/User";
import InviteUser from "./InviteUser";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const GroupCard = ({
  href,
  name,
  description,
  usersAmount,
  listsAmount,
  groupId,
}) => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroup,
    onError: error => {
      console.error("Error removing a group:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
  });

  const handleDeleteGroup = e => {
    e.stopPropagation();
    deleteGroupMutation.mutate({
      groupId: groupId,
    });
  };

  return (
    <>
      <InviteUser isOpen={isInviteOpen} setIsOpen={setIsInviteOpen} />
      <div className=" relative rounded-lg border shadow group-hover:shadow-xl duration-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:cursor-pointer hover:border-blue-500 hover:dark:border-blue-500">
        <Link to={"/groups/$groupId"} params={{ groupId }} key={groupId}>
          <div className="p-6 flex flex-col items-start relative">
            <h2 className="text-lg font-semibold line-clamp-1 pr-10 mb-2 text-blue-400">
              {name}
            </h2>
            <p className="mb-4 text-[14.5px]">{description}</p>
            <div className="mt-auto flex flex-col gap-1 text-[15px] text-neutral-500">
              <div className="flex gap-2">
                <p className="font-semibold">Users:</p>
                <p>{usersAmount}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Created lists:</p>
                <p>{listsAmount}</p>
              </div>
            </div>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-6 right-6"
            >
              <LuMoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuItem
              className="flex gap-2 text-neutral-200 hover:cursor-pointer"
              onClick={() => setIsInviteOpen(true)}
            >
              <LuUserPlus size={18} />
              <p>Invite user</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 text-red-500 hover:cursor-pointer"
              onClick={handleDeleteGroup}
            >
              <LuTrash2 size={18} />
              Delete group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default GroupCard;
