import { ReactElement } from "react";

type ContentTitleProps = {
  title: string;
  cardsAmount: number;
  children: ReactElement;
};

const ContentTitle: React.FC<ContentTitleProps> = ({
  title,
  cardsAmount,
  children,
}) => {
  const DisplaySearch = (cardsAmount: number) => {
    if (cardsAmount > 0) {
      return <>{children}</>;
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
