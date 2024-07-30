import { X } from "lucide-react";
import { ListHeader } from "./ListHeader";
import { ListContent } from "./ListContent";
import { useList } from "@/hooks/list/useList";

const List = () => {
  const { data, isFetched, listId, handleBackgroundClick, handleExit } =
    useList();
  return (
    <div
      className="z-50 flex justify-center max-h-screen overflow-auto fixed top-0 left-0 bg-neutral-400 bg-opacity-80 dark:bg-black dark:bg-opacity-70 w-screen md:min-h-[100%]"
      onClick={handleBackgroundClick}
    >
      <section className="relative flex top-0 flex-col w-[600px] h-full min-h-screen pt-12 pb-8 px-4 rounded-md border dark:border-neutral-800 bg-white dark:bg-neutral-950 md:min-h-full md:h-full md:my-16 md:px-8">
        <X
          size={30}
          className="absolute top-3 right-3 p-0 rounded-md transition-all hover:bg-neutral-200 hover:dark:bg-neutral-600 hover:cursor-pointer"
          onClick={handleExit}
        />
        <ListHeader data={data} isFetched={isFetched} listId={listId} />
        <ListContent
          data={data?.productList}
          isFetched={isFetched}
          listId={listId}
        />
      </section>
    </div>
  );
};

export default List;
