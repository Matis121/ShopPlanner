import { Link, useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuListChecks, LuUsers } from "react-icons/lu";
import ToggleTheme from "./ToggleTheme";
import Notifications from "./notifications/Notifications";
import { logout } from "@/utils/auth";
import useIsMobile from "@/hooks/useIsMobile";
import MobileHamburger from "./MobileHamburger";

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const isActiveElement = () => {
    return (
      <span className="absolute -bottom-[11.5px] -left-2 bg-blue-500 dark:bg-white w-[calc(100%+3px)] h-2 rounded-md"></span>
    );
  };

  const logoutWithRedirect = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header
      className={`fixed flex z-20 w-full items-center border-b py-2 bg-white bg-opacity-95 dark:bg-neutral-950 dark:border-neutral-800 overflow-hidden ${isMobile ? "px-4" : "px-10"}`}
    >
      <Link to="/">
        <span className=" text-blue-400 font-semibold text-xl">
          ShopPlanner
        </span>
      </Link>
      {!isMobile ? (
        <div className="flex ml-24 gap-8">
          <Link
            to="/mylists"
            className="relative font-medium text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-200 hover:bg-neutral-100 text-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-white"
          >
            {({ isActive }) => (
              <div
                className={`flex space-x-2 ${isActive && "dark:text-white text-blue-400"}`}
              >
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
              <div
                className={`flex space-x-2 ${isActive && "dark:text-white text-blue-400"}`}
              >
                <LuUsers size={20} />
                <span className="text-md">Groups</span>
                {isActive && isActiveElement()}
              </div>
            )}
          </Link>
        </div>
      ) : (
        <div className="ml-4 flex">
          <MobileHamburger />
        </div>
      )}
      <div className="flex items-center ml-auto gap-3">
        <Notifications />
        <ToggleTheme />
        <Avatar onClick={logoutWithRedirect} className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
