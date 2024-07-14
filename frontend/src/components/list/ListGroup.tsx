import { X } from "lucide-react";
import { ListHeaderGroup } from "./ListHeader";
import { ListContentGroup } from "./ListContent";
import { useListGroup } from "@/hooks/list/useListGroup";

const ListGroup = () => {
  const { data, isFetched, listId, handleBackgroundClick, handleExit } =
    useListGroup();
  return (
    <div
      className="flex justify-center max-h-screen overflow-auto fixed top-0 left-0 bg-neutral-400 bg-opacity-80 dark:bg-black dark:bg-opacity-70 w-screen z-50 md:min-h-[100%]"
      onClick={handleBackgroundClick}
    >
      <section className="relative flex top-0 flex-col w-[600px] h-full min-h-screen md:min-h-full md:h-full pt-12 pb-8 px-8 rounded-md border dark:border-neutral-800 bg-white dark:bg-neutral-950 md:my-16">
        <X
          size={30}
          className="absolute top-3 right-3 p-0 rounded-md transition-all hover:bg-neutral-200 hover:dark:bg-neutral-600 hover:cursor-pointer"
          onClick={handleExit}
        />
        <ListHeaderGroup data={data} isFetched={isFetched} listId={listId} />
        <ListContentGroup
          data={data?.productList}
          isFetched={isFetched}
          listId={listId}
        />
      </section>
    </div>
  );
};

export default ListGroup;
