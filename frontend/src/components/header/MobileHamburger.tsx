import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LuAlignJustify, LuListChecks, LuUsers } from "react-icons/lu";
import { Link } from "@tanstack/react-router";

const MobileHamburger = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <LuAlignJustify size={30} />
      </DialogTrigger>
      <DialogContent className="top-[5.3rem] max-w-[90%]">
        <Link
          to="/mylists"
          className="relative font-medium text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-200 hover:bg-neutral-100 text-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-white"
        >
          {({ isActive }) => {
            return (
              <div className={`flex space-x-2 ${isActive && "text-blue-400"}`}>
                <LuListChecks size={20} />
                <span className="text-md">My lists</span>
              </div>
            );
          }}
        </Link>

        <Link
          to="/groups"
          className="relative font-medium text-md p-2 flex flex-row items-center space-x-2 rounded-md duration-200 hover:bg-neutral-100 text-neutral-600 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-white"
        >
          {({ isActive }) => {
            return (
              <div className={`flex space-x-2 ${isActive && "text-blue-400"}`}>
                <LuUsers size={20} />
                <span className="text-md">Groups</span>
              </div>
            );
          }}
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default MobileHamburger;
