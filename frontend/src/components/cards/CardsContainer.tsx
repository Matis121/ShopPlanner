type containerProps = {
  children: any;
  contentType: "groups" | "lists";
};

const CardsContainer: React.FC<containerProps> = ({
  children,
  contentType,
}) => {
  return (
    <div
      className={`w-full grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 ${contentType === "lists" && "xl:grid-cols-3"}`}
    >
      {children}
    </div>
  );
};

export default CardsContainer;
