import { createFileRoute } from "@tanstack/react-router";
import List from "@/components/list/List";
import MyLists from "@/pages/MyLists";
import { useList } from "@/hooks/list/useList";

export const Route = createFileRoute("/_authenticated/mylists/$id")({
  component: () => (
    <div>
      <List hookName={useList} />
      <div className="hidden md:block">
        <MyLists />
      </div>
    </div>
  ),
});
