import { useParams } from "@tanstack/react-router";
import ListsInGroup from "@/pages/ListsInGroup";
import { createFileRoute } from "@tanstack/react-router";
import ListGroup from "@/components/list/ListGroup";

export const Route = createFileRoute(
  "/_authenticated/groups/$groupId/list/$listId"
)({
  component: () => {
    const { groupId } = useParams({
      from: "/_authenticated/groups/$groupId/list/$listId",
    });
    return (
      <div>
        <ListGroup />
        <div className="hidden md:block relative">
          <ListsInGroup groupId={groupId} />
        </div>
      </div>
    );
  },
});
