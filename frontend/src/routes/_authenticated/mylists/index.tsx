import { createFileRoute } from "@tanstack/react-router";
import MyLists from "@/pages/MyLists";

export const Route = createFileRoute("/_authenticated/mylists/")({
  component: () => <MyLists />,
});
