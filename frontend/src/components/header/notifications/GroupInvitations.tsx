import React from "react";
import { LuUsers, LuCheck, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { rejectGroupInvitation, confirmGroupInvitation } from "@/api/User";

const GroupInvitations = ({ groupId, groupName }) => {
  const confirmInvite = async () => {
    await confirmGroupInvitation({ groupId });
  };

  const rejectInvite = async () => {
    await rejectGroupInvitation({ groupId });
  };

  return (
    <div className="py-2 px-4 flex gap-2 justify-start flex-col bg-green-300 bg-opacity-30 rounded-xl">
      <div>
        <div className="flex gap-2">
          <LuUsers size={16} />
          <span className="text-xs">New group invitation</span>
        </div>
      </div>
      <div className="flex items-center">
        <p className="mr-6">{groupName}</p>
        <Button
          className="p-4 h-8 rounded-2xl mr-2"
          onClick={() => confirmInvite}
        >
          <LuCheck />
        </Button>
        <Button
          className="p-4 h-8 rounded-2xl"
          variant="destructive"
          onClick={() => rejectInvite}
        >
          <LuX />
        </Button>
      </div>
    </div>
  );
};

export default GroupInvitations;
