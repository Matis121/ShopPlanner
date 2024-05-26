import { createFileRoute } from "@tanstack/react-router";
import GroupLists from "../../pages/GroupLists.tsx";

export const Route = createFileRoute("/groups/$id")({
  component: () => <GroupLists />,
});
