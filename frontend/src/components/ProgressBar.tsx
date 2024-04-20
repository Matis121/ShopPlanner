import { Progress } from "@/components/ui/progress";

type ProgressBarProps = {
  progressBarPercent: number;
  itemsAmount: number;
  collectedItemsAmount: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressBarPercent,
  itemsAmount,
  collectedItemsAmount,
}) => {
  return (
    <div className="pt-6 w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>{progressBarPercent}% Completed</span>
        <span className="flex gap-1">
          <p>{collectedItemsAmount}</p>/<p>{itemsAmount}</p> <p>products</p>
        </span>
      </div>
      <Progress value={progressBarPercent} />
    </div>
  );
};

export default ProgressBar;
