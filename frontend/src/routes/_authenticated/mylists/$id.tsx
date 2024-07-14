import { createFileRoute } from "@tanstack/react-router";
import List from "@/components/list/List";
import MyLists from "@/pages/MyLists";

export const Route = createFileRoute("/_authenticated/mylists/$id")({
  component: () => (
    <div>
      <List />
      <div className="hidden md:block">
        <MyLists />
      </div>
    </div>
  ),
});
