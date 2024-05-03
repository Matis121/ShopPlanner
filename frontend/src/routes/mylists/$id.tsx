import { createFileRoute } from "@tanstack/react-router";
import ProductList from "@/components/list/ListDetails";
import MyLists from "@/pages/MyLists";

export const Route = createFileRoute("/mylists/$id")({
  component: () => (
    <div>
      <ProductList />
      <div className="hidden md:block">
        <MyLists />
      </div>
    </div>
  ),
});
