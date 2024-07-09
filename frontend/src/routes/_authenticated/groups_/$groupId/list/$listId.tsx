import { useParams } from "@tanstack/react-router";
import ListsInGroup from "@/pages/ListsInGroup";
import { createFileRoute } from "@tanstack/react-router";
import GroupListDetails from "@/components/groups/GroupListDetails";

export const Route = createFileRoute(
  "/_authenticated/groups/$groupId/list/$listId"
)({
  component: () => {
    const { groupId } = useParams({
      from: "/_authenticated/groups/$groupId/list/$listId",
    });
    return (
      <div>
        <GroupListDetails />
        <div className="hidden md:block relative">
          <ListsInGroup groupId={groupId} />
        </div>
      </div>
    );
  },
});
