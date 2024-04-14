import { createFileRoute } from "@tanstack/react-router";
import ProductList from "@/components/list/ProductList";
import MyLists from "@/pages/MyLists";

export const Route = createFileRoute("/mylists/$id")({
  component: () => (
    <>
      <ProductList />
      <div className="hidden md:block">
        <MyLists />
      </div>
    </>
  ),
});
