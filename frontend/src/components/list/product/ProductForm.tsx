import { addNewProduct } from "@/api/User";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

type ProductFormProps = {
  listId: string;
};

const ProductForm: React.FC<ProductFormProps> = ({ listId }) => {
  const queryKeyElement = ["lists", listId];

  const queryClient = useQueryClient();
  const [newItemValue, setNewItemValue] = useState("");

  const createProductMutation = useMutation({
    mutationFn: addNewProduct,
    onError: error => {
      console.error("Error adding new product:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyElement });
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
    <Input
      placeholder="Add new product..."
      className="self-center mt-16 rounded-full text-center w-[80%]"
      onKeyDown={e => handleNewItemOnEnterPress(e)}
      value={newItemValue}
      onChange={e => setNewItemValue(e.target.value)}
    />
  );
};

export default ProductForm;
