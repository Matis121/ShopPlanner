import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

type Product = {
  id: number;
  name: string;
  isCollected: boolean;
};

type ProductListProps = {
  data: Product[];
  isFetched: boolean;
  listId: string;
};

const ProductList: React.FC<ProductListProps> = ({
  data,
  isFetched,
  listId,
}) => {
  const [isCollected, setIsCollected] = useState<Product[]>([]);
  const [isNotCollected, setIsNotCollected] = useState<Product[]>([]);

  useEffect(() => {
    if (isFetched) {
      const collected = data
        .filter(item => item.isCollected)
        .sort((a, b) => a.id - b.id);
      const notCollected = data
        .filter(item => !item.isCollected)
        .sort((a, b) => a.id - b.id);

      setIsCollected(collected);
      setIsNotCollected(notCollected);
    }
  }, [data]);

  return (
    <div className="mt-8 flex flex-col">
      <p className="text-sm mb-2">List of products:</p>
      <div className={`rounded-md bg-neutral-100 dark:bg-neutral-900 `}>
        {isFetched &&
          isNotCollected.map((element: any) => (
            <ProductItem
              key={element._id}
              productId={element._id}
              productName={element.name}
              productAmount={element.amount}
              isCollected={element.isCollected}
              listUrlParam={listId}
              queryKeyProp="list"
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
              listUrlParam={listId}
              queryKeyProp="list"
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
