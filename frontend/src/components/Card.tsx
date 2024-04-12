import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";

interface CardProps {
  name: string;
  description?: string; // Optional prop
  status: string;
  progressBarPercent: number;
  handleRemoveItem: () => void;
}

const Card: React.FC<CardProps> = ({
  name,
  description,
  status,
  progressBarPercent,
  handleRemoveItem,
}) => {
  return (
    <div className="rounded-lg min-h-[200px] border shadow group-hover:shadow-xl duration-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:cursor-pointer">
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
              onClick={handleRemoveItem}
            >
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
        <div className="mt-auto pt-6 w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span>0% Completed</span>
            <span>0/0 products</span>
          </div>
          <Progress value={progressBarPercent} />
        </div>
      </div>
    </div>
  );
};

export default Card;
