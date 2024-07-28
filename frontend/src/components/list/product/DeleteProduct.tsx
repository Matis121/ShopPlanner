import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";

type DeleteProductProps = {
  handleDeleteProduct: () => void;
};

const DeleteProduct: React.FC<DeleteProductProps> = ({
  handleDeleteProduct,
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <LuMoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">
          <DropdownMenuItem
            className="flex gap-2 text-red-500 hover:cursor-pointer"
            onClick={handleDeleteProduct}
          >
            <LuTrash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DeleteProduct;
