import { Input } from "@/components/ui/input";
import ProductItem from "./ProductItem";
import { useNavigate } from "@tanstack/react-router";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import { X } from "lucide-react";
import { getSingleList } from "@/api/User";
import { useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { addNewProduct } from "@/api/User";

const ProductList = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const listUrl = useParams({ from: "/mylists/$id" });

  const [cardValues, setCardValues] = useState({ name: "", desc: "" });
  const [itemsList, setItemsList] = useState([]);
  const [newItemValue, setNewItemValue] = useState("");

  const { data, isFetched } = useQuery({
    queryKey: ["lists", listUrl.id],
    queryFn: () => getSingleList(listUrl.id),
  });

  useEffect(() => {
    if (isFetched) {
      setCardValues({ name: data.name, desc: data.description });
      setItemsList(data.productList);
    }
  }, [isFetched, data]);

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

  // MUTATION
  const createProductMutation = useMutation({
    mutationFn: addNewProduct,
    onError: error => {
      console.error("Error adding new product:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", listUrl.id] });
    },
  });

  const handleNewItemOnEnterPress = (e: any) => {
    if (e.key === "Enter" && newItemValue !== "") {
      createProductMutation.mutate({
        listId: listUrl.id,
        productName: e.target.value,
      });
      setNewItemValue("");
    }
  };

  const isCollected = itemsList
    .filter(item => item.isCollected)
    .sort((a, b) => a.id - b.id);

  const isNotCollected = itemsList
    .filter(item => !item.isCollected)
    .sort((a, b) => a.id - b.id);

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
    percentOfCollectedItems =
      ((collectedItemsAmount / itemsAmount) * 100).toFixed(0) | 0;
  };
  checkAmountOfCollectedItems();

  return (
    <div
      className="flex justify-center max-h-screen overflow-auto fixed top-0 left-0 bg-neutral-400 bg-opacity-80 dark:bg-black dark:bg-opacity-70 w-screen z-50 md:min-h-[100%]"
      onClick={handleBackgroundClick}
    >
      <section className="relative flex top-0 flex-col w-[600px] h-full min-h-screen md:min-h-full md:h-full pt-12 pb-8 px-8 rounded-md border dark:border-neutral-800 bg-white dark:bg-neutral-950 md:my-16">
        <X
          size={30}
          className="absolute top-3 right-3 p-0 rounded-md transition-all hover:bg-neutral-200 hover:dark:bg-neutral-600 hover:cursor-pointer"
          onClick={handleExit}
        />
        <Input
          variant="transparent"
          value={cardValues.name}
          className="font-semibold"
        />
        <Textarea
          placeholder="Description..."
          value={cardValues.desc}
          className="mt-4"
        />
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
          <div className={`rounded-md bg-neutral-100 dark:bg-neutral-900 `}>
            {/* ${itemsList.length > 0 ? "border dark:border-neutral-800" : null} */}
            {isFetched &&
              isNotCollected.map((element: any) => (
                <ProductItem
                  key={element._id}
                  productId={element._id}
                  productName={element.name}
                  productAmount={element.amount}
                  isCollected={element.isCollected}
                  listUrlParam={listUrl.id}
                />
              ))}
          </div>
          <div className="bg-white text-neutral-500 dark:bg-neutral-950">
            {isFetched &&
              isCollected.map((element: any) => (
                <ProductItem
                  key={element._id}
                  productId={element._id}
                  productName={element.name}
                  productAmount={element.amount}
                  isCollected={element.isCollected}
                  listUrlParam={listUrl.id}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
