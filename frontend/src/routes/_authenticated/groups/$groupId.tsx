import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import ListsInGroup from "@/pages/ListsInGroup";

export const Route = createFileRoute("/_authenticated/groups/$groupId")({
  component: () => {
    const { groupId } = useParams({ from: "/groups/$groupId" });
    return <ListsInGroup groupId={groupId} />;
  },
});
