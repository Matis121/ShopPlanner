import { Input } from "@/components/ui/input";
import ProductItem from "./ProductItem";
import { useNavigate } from "@tanstack/react-router";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import ProgressBar from "../ProgressBar";
import { X } from "lucide-react";
// import { useParams } from "@tanstack/react-router";

const ProductList = () => {
  const navigate = useNavigate();

  // const params = useParams({ from: "/mylists/$id" });

  const initialListState = [
    { id: 1, productName: "first", productAmount: 5, isCollected: true },
    { id: 2, productName: "second", productAmount: 1, isCollected: false },
    { id: 3, productName: "third", productAmount: 30, isCollected: false },
    { id: 4, productName: "fourth", productAmount: 2, isCollected: true },
    { id: 5, productName: "fifth", productAmount: 1, isCollected: true },
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
  const handleExit = () => {
    navigate({ to: "/mylists" });
  };

  // changing beetween isCollected false / true
  const collectingActions = (id: number) => {
    const index = itemsList.findIndex(item => item.id === id);
    if (index !== -1) {
      const newListState = [...itemsList];
      newListState[index].isCollected = !newListState[index].isCollected;
      setItemsList(newListState);
    }
    checkAmountOfCollectedItems();
  };

  const [newItemValue, setNewItemValue] = useState("");

  const handleNewItemOnEnterPress = (e: any) => {
    if (e.key === "Enter" && newItemValue !== "") {
      setItemsList(prev => [
        ...prev,
        {
          id: 10,
          productName: e.target.value,
          productAmount: 1,
          isCollected: false,
        },
      ]);
      setNewItemValue("");
    }
  };

  // Check percent of collected items
  let percentOfCollectedItems: number = 0;
  let itemsAmount = itemsList.length;
  let collectedItemsAmount: number = 0;

  const checkAmountOfCollectedItems = () => {
    itemsList.map(item => {
      if (item.isCollected) {
        collectedItemsAmount++;
      }
    });
    percentOfCollectedItems = (collectedItemsAmount / itemsAmount) * 100;
  };
  checkAmountOfCollectedItems();

  return (
    <div
      className="flex justify-center absolute top-0 left-0 overflow-y-auto bg-neutral-400 bg-opacity-80 dark:bg-black dark:bg-opacity-70 w-screen z-50 md:min-h-[100%]"
      onClick={handleBackgroundClick}
    >
      <section className="relative flex top-0 flex-col w-[600px] min-h-screen md:min-h-full md:h-full py-8 px-8 rounded-md border dark:border-neutral-800 bg-white dark:bg-neutral-950 md:my-16">
        <X
          size={30}
          className="absolute top-4 right-8 p-0 rounded-md transition-all hover:bg-neutral-200 hover:dark:bg-neutral-600 hover:cursor-pointer"
          onClick={handleExit}
        />
        <Input
          variant="transparent"
          value={cardValues.name}
          className="font-semibold"
        ></Input>
        <Textarea value={cardValues.desc} className="mt-4"></Textarea>
        <ProgressBar
          progressBarPercent={percentOfCollectedItems}
          itemsAmount={itemsAmount}
          collectedItemsAmount={collectedItemsAmount}
        />
        <Input
          placeholder="Add new product..."
          className="self-center mt-16 rounded-full text-center w-[80%]"
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
                key={element.id}
                productName={element.productName}
                productAmount={element.productAmount}
                isCollected={element.isCollected}
                collectingActions={() => collectingActions(element.id)}
              />
            ))}
          </div>

          <div className="bg-white text-neutral-500 dark:bg-neutral-950">
            {isCollected.map(element => (
              <ProductItem
                key={element.id}
                productName={element.productName}
                productAmount={element.productAmount}
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
