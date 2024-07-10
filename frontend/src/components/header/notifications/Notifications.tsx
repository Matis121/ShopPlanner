import { LuBell } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GroupInvitations from "./GroupInvitations";
import { useGroupInvitations } from "@/hooks/useGroupInvitations";

type GroupInvitation = {
  id: number;
  groupId: number;
  groupName: string;
};

const Notifications = () => {
  const { data } = useGroupInvitations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <LuBell size={24} />
        {data && data.length > 0 && (
          <div className="flex items-center justify-center w-[20px] h-[20px] absolute -top-1.5 -right-1.5 bg-red-400 rounded-full border border-neutral-300">
            <p className=" text-red-200 text-xs font-bold">{data.length}</p>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center flex-col gap-4 p-1">
          {data && data.length > 0 ? (
            (data as GroupInvitation[]).map(element => (
              <GroupInvitations
                key={element.id}
                groupId={element.groupId}
                groupName={element.groupName}
              />
            ))
          ) : (
            <p className="p-1 text-sm text-neutral-400">No invitations</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
