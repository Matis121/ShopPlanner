import React, { Key } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
import ProgressBar from "../ProgressBar";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteList } from "@/api/User";
import { useProgressBar } from "@/hooks/useProgressBar";
import CardStatus from "./CardStatus";
import { ListData } from "../types/List";
import { useToast } from "../ui/use-toast";
import { LuCheckCircle } from "react-icons/lu";

type CardProps = {
  listData: ListData;
  isFetched: boolean;
  mutationFn: (variables: any) => Promise<any>;
  queryKeyProp: "list" | "group";
  groupId?: string;
};

const ListCard: React.FC<CardProps> = ({
  listData,
  isFetched,
  mutationFn,
  queryKeyProp,
  groupId,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteListMutation = useMutation({
    mutationFn: mutationFn,
    onError: error => {
      console.error("Error removing a list:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeyProp === "list" ? "lists" : "groupLists", groupId],
      });
      toast({
        variant: "positive",
        description: (
          <div className="flex items-center gap-2">
            <LuCheckCircle size={22} />
            List has been successfully removed.
          </div>
        ),
      });
    },
  });

  const handleDeleteList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mutationFn === deleteList) {
      deleteListMutation.mutate({
        listId: listData._id,
      });
    } else {
      deleteListMutation.mutate({
        listId: listData._id,
        groupId: groupId,
      });
    }
  };

  const { itemsAmount, percentOfCollectedItems, collectedItemsAmount } =
    useProgressBar(listData?.productList, isFetched);

  return (
    <div className="rounded-lg min-h-[200px] border shadow group-hover:shadow-xl duration-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:cursor-pointer hover:border-blue-500 hover:dark:border-blue-500">
      <div className="p-6 h-full flex flex-wrap flex-col items-start relative overflow-hidden">
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
              className="flex gap-2 text-red-500 hover:cursor-pointer"
              onClick={handleDeleteList}
            >
              <LuTrash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h2 className="text-lg font-semibold line-clamp-1 pr-10">
          {listData.name}
        </h2>
        {listData.description ? (
          <p className="mt-3 text-sm">{listData.description}</p>
        ) : null}
        <CardStatus percentOfCollectedItems={percentOfCollectedItems} />
        <ProgressBar
          itemsAmount={itemsAmount}
          collectedItemsAmount={collectedItemsAmount}
          progressBarPercent={percentOfCollectedItems}
        />
      </div>
    </div>
  );
};

export default ListCard;
