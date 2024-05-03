import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
import ProgressBar from "../ProgressBar";

type CardProps = {
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
}) => {
  const progressBarPercent =
    ((collectedItemsAmount / itemsAmount) * 100).toFixed(0) | 0;
  const status =
    progressBarPercent === 0
      ? "New"
      : progressBarPercent < 100
        ? "In progress"
        : "Done";

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
              <DropdownMenuItem className="flex gap-2 text-red-500 hover:cursor-pointer">
                <LuTrash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h2 className="text-lg font-semibold line-clamp-1 pr-10">{name}</h2>
          {description ? <p className="mt-3 text-sm">{description}</p> : null}
          <span className="mt-6 inline-flex flex-shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20">
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
