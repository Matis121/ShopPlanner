const CardsContainer = ({ children }: any) => {
  return (
    <div className="w-full grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
};

export default CardsContainer;
