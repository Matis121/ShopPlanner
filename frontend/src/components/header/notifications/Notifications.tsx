import React from "react";
import { LuBell } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GroupInvitations from "./GroupInvitations";

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LuBell size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col gap-4 p-1">
          <GroupInvitations />
          <GroupInvitations />
          <GroupInvitations />
          <GroupInvitations />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
