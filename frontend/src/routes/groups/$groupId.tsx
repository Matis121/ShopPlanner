import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import GroupLists from "@/pages/GroupLists";

export const Route = createFileRoute("/groups/$groupId")({
  component: () => {
    const { groupId } = useParams({ from: "/groups/$groupId" });
    return <GroupLists groupId={groupId} />;
  },
});
