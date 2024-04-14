import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progressBarPercent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressBarPercent }) => {
  return (
    <div className="pt-6 w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>{progressBarPercent}% Completed</span>
        <span>0/0 products</span>
      </div>
      <Progress value={progressBarPercent} />
    </div>
  );
};

export default ProgressBar;
