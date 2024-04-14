import { Input } from "@/components/ui/input";
import ProductItem from "./ProductItem";
import { useNavigate } from "@tanstack/react-router";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import ProgressBar from "../ProgressBar";

const ProductList = () => {
  const navigate = useNavigate();

  const initialListState = [
    { id: 1, productName: "first", isCollected: true },
    { id: 2, productName: "second", isCollected: false },
    { id: 3, productName: "third", isCollected: false },
    { id: 4, productName: "fourth", isCollected: true },
    { id: 5, productName: "fifth", isCollected: true },
  ];

  const [itemsList, setItemsList] = useState(initialListState);

  const cardValues = { name: "Pierwsza lista", desc: "randomowy desc" };

  const isCollected = itemsList
    .filter(item => item.isCollected)
    .sort((a, b) => a.id - b.id);

  const isNotCollected = itemsList
    .filter(item => !item.isCollected)
    .sort((a, b) => a.id - b.id);

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      navigate({ to: "/mylists" });
    }
  };

  // changing beetween isCollected false / true
  const collectingActions = (id: number) => {
    const index = itemsList.findIndex(item => item.id === id);
    if (index !== -1) {
      const newListState = [...itemsList];
      newListState[index].isCollected = !newListState[index].isCollected;
      setItemsList(newListState);
    }
  };

  const [newItemValue, setNewItemValue] = useState("");

  const handleNewItemOnEnterPress = (e: any) => {
    if (e.key === "Enter") {
      setItemsList(prev => [
        ...prev,
        { id: 10, productName: e.target.value, isCollected: false },
      ]);
      setNewItemValue("");
    }
  };

  return (
    <div
      className="flex justify-center absolute top-0 left-0 overflow-y-auto bg-neutral-400 bg-opacity-80 dark:bg-black dark:bg-opacity-70 w-screen z-50 md:min-h-[100%]"
      onClick={handleBackgroundClick}
    >
      <section className="flex top-0 flex-col w-[600px] min-h-screen md:min-h-full md:h-full py-8 px-8 rounded-md border dark:border-neutral-800 bg-white dark:bg-neutral-950 md:my-16">
        <Input
          variant="transparent"
          value={cardValues.name}
          className="font-semibold"
        ></Input>
        <Textarea value={cardValues.desc} className="mt-4"></Textarea>
        <ProgressBar progressBarPercent={50} />
        <Input
          placeholder="Add new product..."
          className="self-center mt-16 rounded-full text-center"
          onKeyDown={e => handleNewItemOnEnterPress(e)}
          value={newItemValue}
          onChange={e => setNewItemValue(e.target.value)}
        />
        <div className="mt-8 flex flex-col">
          <p className="text-sm mb-2">List of products:</p>
          <div
            className={`rounded-md bg-neutral-100 dark:bg-neutral-900 ${isNotCollected.length > 0 ? "border dark:border-neutral-800" : null}`}
          >
            {isNotCollected.map(element => (
              <ProductItem
                productName={element.productName}
                key={element.id}
                isCollected={element.isCollected}
                collectingActions={() => collectingActions(element.id)}
              />
            ))}
          </div>

          <div className="bg-white text-neutral-500 dark:bg-neutral-950">
            {isCollected.map(element => (
              <ProductItem
                productName={element.productName}
                key={element.id}
                isCollected={element.isCollected}
                collectingActions={() => collectingActions(element.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
