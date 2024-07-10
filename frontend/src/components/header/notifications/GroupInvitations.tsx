import { LuUsers, LuCheck, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { rejectGroupInvitation, confirmGroupInvitation } from "@/api/User";
import { useQueryClient } from "@tanstack/react-query";

type GroupInvitationsProps = {
  groupId: number;
  groupName: string;
};

const GroupInvitations: React.FC<GroupInvitationsProps> = ({
  groupId,
  groupName,
}) => {
  const queryClient = useQueryClient();

  const confirmInvite = async () => {
    await confirmGroupInvitation({ groupId });
    queryClient.invalidateQueries({ queryKey: ["groupInvitations"] });
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  };

  const rejectInvite = async () => {
    await rejectGroupInvitation({ groupId });
    queryClient.invalidateQueries({ queryKey: ["groupInvitations"] });
  };

  return (
    <div className="w-full py-2 px-4 flex gap-2 justify-start flex-col bg-green-300 bg-opacity-30 rounded-md">
      <div className="mb-2">
        <div className="flex gap-2">
          <LuUsers size={16} />
          <span className="text-xs">New group invitation!</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="mr-6 tex-md font-semibold">{groupName}</p>
        <div>
          <Button
            className="p-4 h-8 rounded-2xl mr-2"
            onClick={() => confirmInvite()}
          >
            <LuCheck />
          </Button>
          <Button
            className="p-4 h-8 rounded-2xl"
            variant="destructive"
            onClick={() => rejectInvite()}
          >
            <LuX />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupInvitations;
