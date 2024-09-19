import React, { useEffect, useState } from "react";
import { ProductItem, ProductItemGroup } from "./ProductItem";
import { useParams } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { LuPackagePlus } from "react-icons/lu";

type Product = {
  id: number;
  name: string;
  isCollected: boolean;
};

type ProductListProps = {
  data: Product[];
  isFetched: boolean;
  isLoading: boolean;
  listId: string;
  queryKey: "list" | "group";
};

const ProductList: React.FC<ProductListProps> = ({
  data,
  isFetched,
  isLoading,
  listId,
  queryKey,
}) => {
  const [isCollected, setIsCollected] = useState<Product[]>([]);
  const [isNotCollected, setIsNotCollected] = useState<Product[]>([]);

  let groupId: string;

  if (queryKey === "group") {
    const paramUrl = useParams({
      from: "/_authenticated/groups/$groupId/list/$listId",
    });
    groupId = paramUrl.groupId;
  }

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
    <>
      {data?.length === 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-2 mt-8 rounded-md">
          <LuPackagePlus size={30} className="text-neutral-500" />

          <p className="text-sm mb-2 dark:text-neutral-400 text-neutral-600">
            Add your first product
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col">
          <p className="text-sm mb-2">List of products:</p>
          {isLoading ? (
            <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-2 rounded-md">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            </div>
          ) : (
            <>
              <div className={`rounded-md bg-neutral-100 dark:bg-neutral-900 `}>
                {isFetched &&
                  isNotCollected.map((element: any) =>
                    queryKey === "list" ? (
                      <ProductItem
                        key={element._id}
                        productId={element._id}
                        productName={element.name}
                        productAmount={element.amount}
                        isCollected={element.isCollected}
                        listUrlParam={listId}
                        groupId={groupId}
                      />
                    ) : (
                      <ProductItemGroup
                        key={element._id}
                        productId={element._id}
                        productName={element.name}
                        productAmount={element.amount}
                        isCollected={element.isCollected}
                        listUrlParam={listId}
                        groupId={groupId}
                      />
                    )
                  )}
              </div>
              <div className="bg-white text-neutral-500 dark:bg-neutral-950">
                {isFetched &&
                  isCollected.map((element: any) =>
                    queryKey === "list" ? (
                      <ProductItem
                        key={element._id}
                        productId={element._id}
                        productName={element.name}
                        productAmount={element.amount}
                        isCollected={element.isCollected}
                        listUrlParam={listId}
                        groupId={groupId}
                      />
                    ) : (
                      <ProductItemGroup
                        key={element._id}
                        productId={element._id}
                        productName={element.name}
                        productAmount={element.amount}
                        isCollected={element.isCollected}
                        listUrlParam={listId}
                        groupId={groupId}
                      />
                    )
                  )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductList;
