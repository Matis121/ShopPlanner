import { createFileRoute } from "@tanstack/react-router";
import GroupLists from "../../pages/SingleGroup.tsx";

export const Route = createFileRoute("/groups/$id")({
  component: () => <GroupLists />,
});
