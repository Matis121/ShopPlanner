import { addNewProduct, addNewProductInGroup } from "@/api/User";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useParams } from "@tanstack/react-router";

const ProductFormView = ({
  handleNewItemOnEnterPress,
  setNewItemValue,
  newItemValue,
}) => {
  return (
    <Input
      placeholder="Add new product..."
      className="self-center mt-16 rounded-full text-center w-[80%]"
      onKeyDown={e => handleNewItemOnEnterPress(e)}
      value={newItemValue}
      onChange={e => setNewItemValue(e.target.value)}
    />
  );
};

export const ProductForm = ({ listId }) => {
  const queryClient = useQueryClient();
  const [newItemValue, setNewItemValue] = useState("");
  const createProductMutation = useMutation({
    mutationFn: addNewProduct,
    onError: error => {
      console.error("Error adding new product:", error);
    },
    onSuccess: () => {
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

export const ProductFromGroup = ({ listId }) => {
  const queryClient = useQueryClient();
  const { groupId } = useParams({
    from: "/_authenticated/groups/$groupId/list/$listId",
  });

  const [newItemValue, setNewItemValue] = useState("");
  const createProductMutation = useMutation({
    mutationFn: addNewProductInGroup,
    onError: error => {
      console.error("Error adding new product:", error);
    },
    onSuccess: () => {
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
