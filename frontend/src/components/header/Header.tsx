import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuListChecks, LuUsers } from "react-icons/lu";
import ToggleTheme from "./ToggleTheme";
import Notifications from "./notifications/Notifications";
import { logout } from "@/utils/auth";

const Header = () => {
  const isActiveElement = () => {
    return (
      <span className="absolute -bottom-[11.5px] -left-2 bg-blue-500 dark:bg-white w-[calc(100%+3px)] h-2 rounded-md"></span>
    );
  };

  return (
    <header className="flex items-center border-b px-10 py-2 bg-white dark:bg-neutral-950 dark:border-neutral-800 overflow-hidden">
      <Link to="/">
        <span className=" text-blue-400 font-semibold text-xl">
          ShopPlanner
        </span>
      </Link>
      <div className="flex ml-24 gap-8">
        <Link
          to="/mylists"
          className="relative font-medium text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-200 hover:bg-neutral-100 text-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-white"
        >
          {({ isActive }) => (
            <div className="flex space-x-2">
              <LuListChecks size={20} />
              <span className="text-md">My lists</span>
              {isActive && isActiveElement()}
            </div>
          )}
        </Link>
        <Link
          to="/groups"
          className="relative font-medium text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-200 hover:bg-neutral-100 text-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-white"
        >
          {({ isActive }) => (
            <div className="flex space-x-2">
              <LuUsers size={20} />
              <span className="text-md">Groups</span>
              {isActive && isActiveElement()}
            </div>
          )}
        </Link>
      </div>
      <div className="flex items-center ml-auto gap-4">
        <Notifications />
        <ToggleTheme />
        <Avatar onClick={logout} className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
