import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuListChecks, LuUsers } from "react-icons/lu";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <header className="flex items-center border-b py-2 px-10 bg-white dark:bg-neutral-950">
      <div>
        <span className=" text-blue-400 font-semibold text-xl">
          ShopPlanner
        </span>
      </div>
      <div className="flex ml-24 gap-8">
        <div className="relative font-medium text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-200 hover:bg-neutral-100 text-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-white">
          <LuListChecks size={20} />
          <span className="text-md">My lists</span>
        </div>
        <div className="relative font-medium text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-200 hover:bg-neutral-100 text-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-white">
          <LuUsers size={20} />
          <span className="text-md">Groups</span>
        </div>
      </div>
      <div className="flex items-center ml-auto gap-4">
        <ToggleTheme />
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
