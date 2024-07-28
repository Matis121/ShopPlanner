import CardsContainer from "../cards/CardsContainer";
import { Skeleton } from "@/components/ui/skeleton";

type ListSkeletonProps = {
  qty: number;
};

const ListSkeleton: React.FC<ListSkeletonProps> = ({ qty }) => {
  const cards = Array.from({ length: qty }, (_, i) => (
    <div
      className="flex flex-col gap-6 b px-4 py-6 rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-950 opacity-35"
      key={i}
    >
      <Skeleton className="w-[130px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <div className="flex justify-between mt-4">
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
      </div>
      <Skeleton className="w-full h-[20px] rounded-full" />
    </div>
  ));

  return <CardsContainer contentType={"lists"}>{cards}</CardsContainer>;
};

export default ListSkeleton;
