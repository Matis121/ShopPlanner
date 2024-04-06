import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddNewList from "./AddNewList";

interface ContentTitleProps {
  title: string;
  cardsAmount: number;
}

const ContentTitle: React.FC<ContentTitleProps> = ({ title, cardsAmount }) => {
  const DisplaySearch = (cardsAmount: number) => {
    if (cardsAmount > 0) {
      return (
        <>
          <Input
            type="text"
            placeholder="Search list..."
            className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
          />
          <AddNewList />
        </>
      );
    }
    return null;
  };

  return (
    <div
      className={`w-full pt-8 xl:pb-12 flex justify-between relative ${cardsAmount > 0 ? "pb-32" : "pb-12"}`}
    >
      <h2 className="font-semibold text-3xl">{title}</h2>
      {DisplaySearch(cardsAmount)}
    </div>
  );
};

export default ContentTitle;
