import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
import { Button } from "../ui/button";

const GroupCard = ({ name, description, usersAmount, listsAmount }) => {
  return (
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
        <h2 className="text-lg font-semibold line-clamp-1 pr-10 mb-2 text-blue-500">
          Name
        </h2>
        <p className="mb-4 text-[14.5px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="mt-auto flex flex-col gap-1 text-[15px] text-neutral-500">
          <div className="flex gap-2">
            <p className="font-semibold">Users:</p>
            <p>2</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Created lists:</p>
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
