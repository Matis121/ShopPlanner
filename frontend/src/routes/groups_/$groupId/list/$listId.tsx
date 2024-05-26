import { useParams } from "@tanstack/react-router";
import GroupLists from "@/pages/GroupLists";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/groups/$groupId/list/$listId")({
  component: () => {
    const { groupId } = useParams({ from: "/groups/$groupId/list/$listId" });
    return (
      <div>
        <div className="absolute z-30 w-full h-full bg-pink-500 opacity-30">
          test
        </div>
        <div className="hidden md:block relative">
          <GroupLists groupId={groupId} />
        </div>
      </div>
    );
  },
});
