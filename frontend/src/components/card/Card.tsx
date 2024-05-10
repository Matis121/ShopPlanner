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

type CardProps = {
  id: Key;
  name: string;
  description?: string; // Optional prop
  itemsAmount: number;
  collectedItemsAmount: number;
};

const Card: React.FC<CardProps> = ({
  name,
  description,
  itemsAmount,
  collectedItemsAmount,
  id,
}) => {
  const queryClient = useQueryClient();

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onError: error => {
      console.error("Error removing a list:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  const handleDeleteList = e => {
    e.stopPropagation();
    deleteListMutation.mutate({
      listId: id,
    });
  };

  const progressBarPercent =
    ((collectedItemsAmount / itemsAmount) * 100).toFixed(0) | 0;

  const status =
    progressBarPercent === 0
      ? "New"
      : progressBarPercent < 100
        ? "In progress"
        : "Collected";

  return (
    <>
      <div className="rounded-lg min-h-[200px] border shadow group-hover:shadow-xl duration-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:cursor-pointer hover:border-blue-500 hover:dark:border-blue-500">
        <div className="p-6 h-full flex flex-col items-start relative">
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
          <h2 className="text-lg font-semibold line-clamp-1 pr-10">{name}</h2>
          {description ? <p className="mt-3 text-sm">{description}</p> : null}
          <span
            className={`mt-6 inline-flex flex-shrink-0 items-center rounded-full ring-1 px-2 py-1 text-xs font-medium ${status == "New" ? "bg-blue-50 text-blue-700 ring-blue-600/20" : status == "In progress" ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20" : "bg-green-50 text-green-700 ring-green-600/20"}`}
          >
            {status}
          </span>
          <ProgressBar
            itemsAmount={itemsAmount}
            collectedItemsAmount={collectedItemsAmount}
            progressBarPercent={progressBarPercent}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
