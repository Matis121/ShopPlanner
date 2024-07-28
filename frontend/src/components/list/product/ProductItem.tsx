import { Loader2 } from "lucide-react";
import { FcCheckmark } from "react-icons/fc";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  deleteProduct,
  deleteProductInGroup,
  updateProduct,
  updateProductInGroup,
} from "@/api/User";
import DeleteProduct from "./DeleteProduct";

type ProductItemProps = {
  productId: string;
  productName: string;
  productAmount: number;
  isCollected: boolean;
  listUrlParam: string;
  groupId?: string;
};

type ProductItemViewProps = {
  productName: string;
  productAmount: number;
  isCollected: boolean;
  groupId?: string;
  handleCollectingProduct: () => void;
  handleDeleteProduct: () => void;
  productUpdateStatus: string;
};

const ProductItemView: React.FC<ProductItemViewProps> = ({
  productName,
  productAmount,
  isCollected,
  handleCollectingProduct,
  handleDeleteProduct,
  productUpdateStatus,
}) => {
  console.log(productUpdateStatus);
  return (
    <div
      className={`flex items-center justify-center py-2 px-4 font-semibold min-h-[52px]`}
    >
      <div
        onClick={handleCollectingProduct}
        className={`flex items-center justify-center min-w-[25px] min-h-[25px] w-[25px] h-[25px] cursor-pointer mr-4 rounded-full ${!isCollected && productUpdateStatus === "idle" && "hover:bg-blue-500 border-2 border-blue-500 transition-all"}`}
      >
        {isCollected && productUpdateStatus === "idle" && (
          <FcCheckmark size={25} />
        )}
        {productUpdateStatus !== "idle" && (
          <Loader2 className="h-6 w-6 animate-spin" />
        )}
      </div>
      <p className="text-sm w-full overflow-hidden mr-3">{productName}</p>
      <div className="ml-auto flex items-center">
        <div className="flex gap-0.5 mr-2">
          {productAmount > 1 && (
            <p className="text-blue-400">{productAmount}</p>
          )}
        </div>
        <DeleteProduct handleDeleteProduct={handleDeleteProduct} />
      </div>
    </div>
  );
};

export const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  productName,
  productAmount,
  isCollected,
  listUrlParam,
}) => {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onError: error => {
      console.error("Error adding new product:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onError: error => {
      console.error("Error removing a product:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  const handleCollectingProduct = () => {
    updateProductMutation.mutate({
      listId: listUrlParam,
      productId: productId,
    });
  };

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate({
      listId: listUrlParam,
      productId: productId,
    });
  };

  return (
    <ProductItemView
      productName={productName}
      productAmount={productAmount}
      isCollected={isCollected}
      handleCollectingProduct={handleCollectingProduct}
      handleDeleteProduct={handleDeleteProduct}
      productUpdateStatus={updateProductMutation.status}
    />
  );
};

export const ProductItemGroup: React.FC<ProductItemProps> = ({
  productId,
  productName,
  productAmount,
  isCollected,
  listUrlParam,
  groupId,
}) => {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: updateProductInGroup,
    onError: error => {
      console.error("Error adding new product:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupLists", listUrlParam],
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductInGroup,
    onError: error => {
      console.error("Error removing a product:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupLists", listUrlParam],
      });
    },
  });

  const handleCollectingProduct = () => {
    updateProductMutation.mutate({
      groupId: groupId,
      listId: listUrlParam,
      productId: productId,
    });
  };

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate({
      groupId: groupId,
      listId: listUrlParam,
      productId: productId,
    });
  };

  return (
    <ProductItemView
      productName={productName}
      productAmount={productAmount}
      isCollected={isCollected}
      handleCollectingProduct={handleCollectingProduct}
      handleDeleteProduct={handleDeleteProduct}
      productUpdateStatus={updateProductMutation.status}
    />
  );
};
