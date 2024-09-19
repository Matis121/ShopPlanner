import { addNewProduct, addNewProductInGroup } from "@/api/User";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { useParams } from "@tanstack/react-router";

type ProductFormViewProps = {
  handleNewItemOnEnterPress: (e: any) => void;
  newItemValue: string;
  setNewItemValue: Dispatch<SetStateAction<string>>;
};

type ProductFormProp = {
  listId: string;
};

const ProductFormView: React.FC<ProductFormViewProps> = ({
  handleNewItemOnEnterPress,
  setNewItemValue,
  newItemValue,
}) => {
  return (
    <Input
      placeholder="Add new product..."
      className="self-center mt-16 rounded-full text-center w-[80%]"
      maxLength={150}
      onKeyDown={e => handleNewItemOnEnterPress(e)}
      value={newItemValue}
      onChange={e => setNewItemValue(e.target.value)}
    />
  );
};

export const ProductForm: React.FC<ProductFormProp> = ({ listId }) => {
  const queryClient = useQueryClient();
  const [newItemValue, setNewItemValue] = useState("");
  const createProductMutation = useMutation({
    mutationFn: addNewProduct,
    onMutate: async newData => {
      await queryClient.cancelQueries({ queryKey: ["lists", listId] });
      const previousProductsData = queryClient.getQueryData(["lists", listId]);
      queryClient.setQueryData(["lists", listId], (oldData: any) => {
        if (!oldData) return { productList: [newData] };
        return {
          ...oldData,
          productList: [
            ...oldData.productList,
            {
              name: newData.productName,
              amount: 1,
              isCollected: false,
            },
          ],
        };
      });

      return { previousProductsData };
    },
    onError: (error, context) => {
      if (context?.previousProductsData) {
        queryClient.setQueryData(
          ["lists", listId],
          context.previousProductsData
        );
      }
      console.error("Error adding product:", error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", listId] });
    },
  });

  const handleNewItemOnEnterPress = (e: any) => {
    if (e.key === "Enter" && newItemValue !== "") {
      createProductMutation.mutate({
        listId: listId,
        productName: e.target.value,
      });
      setNewItemValue("");
    }
  };

  return (
    <ProductFormView
      handleNewItemOnEnterPress={handleNewItemOnEnterPress}
      setNewItemValue={setNewItemValue}
      newItemValue={newItemValue}
    />
  );
};

export const ProductFromGroup: React.FC<ProductFormProp> = ({ listId }) => {
  const queryClient = useQueryClient();
  const { groupId } = useParams({
    from: "/_authenticated/groups/$groupId/list/$listId",
  });

  const [newItemValue, setNewItemValue] = useState("");
  const createProductMutation = useMutation({
    mutationFn: addNewProductInGroup,
    onMutate: async newData => {
      await queryClient.cancelQueries({ queryKey: ["groupLists", listId] });
      const previousProductsData = queryClient.getQueryData([
        "groupLists",
        listId,
      ]);
      queryClient.setQueryData(["groupLists", listId], (oldData: any) => {
        if (!oldData) return { productList: [newData] };
        return {
          ...oldData,
          productList: [
            ...oldData.productList,
            {
              name: newData.productName,
              amount: 1,
              isCollected: false,
            },
          ],
        };
      });

      return { previousProductsData };
    },
    onError: (error, context) => {
      if (context?.previousProductsData) {
        queryClient.setQueryData(
          ["groupLists", listId],
          context.previousProductsData
        );
      }
      console.error("Error adding product:", error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groupLists", listId] });
    },
  });

  const handleNewItemOnEnterPress = (e: any) => {
    if (e.key === "Enter" && newItemValue !== "") {
      createProductMutation.mutate({
        listId: listId,
        groupId: groupId,
        productName: e.target.value,
      });
      setNewItemValue("");
    }
  };

  return (
    <ProductFormView
      handleNewItemOnEnterPress={handleNewItemOnEnterPress}
      setNewItemValue={setNewItemValue}
      newItemValue={newItemValue}
    />
  );
};
