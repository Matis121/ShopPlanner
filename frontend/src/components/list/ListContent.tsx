import { ProductForm, ProductFromGroup } from "./product/ProductForm";
import ProductList from "./product/ProductList";

type Product = {
  id: number;
  name: string;
  isCollected: boolean;
};

type ListContentProps = {
  data: Product[];
  isFetched: boolean;
  isLoading: boolean;
  listId: string;
};

export const ListContent: React.FC<ListContentProps> = ({
  data,
  isFetched,
  isLoading,
  listId,
}) => {
  return (
    <>
      <ProductForm listId={listId} />
      <ProductList
        data={data}
        isFetched={isFetched}
        isLoading={isLoading}
        listId={listId}
        queryKey={"list"}
      />
    </>
  );
};

export const ListContentGroup: React.FC<ListContentProps> = ({
  data,
  isFetched,
  isLoading,
  listId,
}) => {
  return (
    <>
      <ProductFromGroup listId={listId} />
      <ProductList
        data={data}
        isFetched={isFetched}
        isLoading={isLoading}
        listId={listId}
        queryKey={"group"}
      />
    </>
  );
};
