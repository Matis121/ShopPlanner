import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2, LuPlus, LuMinus } from "react-icons/lu";
import { FcCheckmark } from "react-icons/fc";

interface listProps {
  productName: string;
  productAmount: number;
  isCollected: boolean;
  collectingActions: () => void;
}

const ProductItem: React.FC<listProps> = ({
  productName,
  productAmount,
  isCollected,
  collectingActions,
}) => {
  return (
    <div className={`flex items-center justify-center py-2 px-4 font-semibold`}>
      <div
        onClick={collectingActions}
        className={`min-w-[25px] min-h-[25px] w-[25px] h-[25px] cursor-pointer mr-4 rounded-full ${isCollected ? null : "hover:bg-blue-500 border-2 border-blue-500 transition-all"}`}
      >
        {isCollected && <FcCheckmark size={25} />}
      </div>
      <p className="text-sm w-full overflow-hidden mr-3">{productName}</p>
      <div className="ml-auto flex items-center">
        {isCollected ? (
          <>
            {productAmount > 1 && (
              <input
                className="bg-transparent outline-none text-center max-w-[30px] text-sm mr-[76px]"
                value={productAmount}
              />
            )}
          </>
        ) : (
          <>
            <div className="flex gap-0.5 mr-2">
              {productAmount > 1 ? (
                <>
                  <button className="rounded-full p-1.5 transition-all w-full h-full bg-blue-500 bg-opacity-80 text-white hover:bg-blue-600">
                    <LuMinus />
                  </button>
                  <input
                    className="bg-transparent outline-none text-center max-w-[30px] text-sm"
                    value={productAmount}
                  />
                </>
              ) : null}
              <button className="rounded-full p-1.5 transition-all w-full h-full bg-blue-500 bg-opacity-80 text-white hover:bg-blue-600">
                <LuPlus />
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <LuMoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30">
                <DropdownMenuItem className="flex gap-2 text-red-500 hover:cursor-pointer">
                  <LuTrash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
