import CardsContainer from "../cards/CardsContainer";
import { Skeleton } from "@/components/ui/skeleton";

type GroupSkeletonProps = {
  qty: number;
};

const GroupSkeleton: React.FC<GroupSkeletonProps> = ({ qty }) => {
  const cards = Array.from({ length: qty }, (_, i) => (
    <div
      className="flex flex-col gap-3 b px-4 py-6 rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-950 opacity-35"
      key={i}
    >
      <Skeleton className="w-[100px] h-[20px] rounded-full mb-5" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[150px] h-[20px] rounded-full" />
    </div>
  ));

  return <CardsContainer contentType={"groups"}>{cards}</CardsContainer>;
};

export default GroupSkeleton;
