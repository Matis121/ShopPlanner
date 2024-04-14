import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreVertical, LuTrash2 } from "react-icons/lu";
import { FcCheckmark } from "react-icons/fc";

interface listProps {
  productName: string;
  isCollected: boolean;
  collectingActions: () => void;
}

const ProductItem: React.FC<listProps> = ({
  productName,
  isCollected,
  collectingActions,
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <div className={`flex items-center py-2 px-4 font-semibold`}>
          <div
            onClick={collectingActions}
            className={`w-[25px] h-[25px] mr-4 rounded-full ${isCollected ? null : "hover:bg-blue-500 border-2 border-blue-500 transition-all"}`}
          >
            {isCollected && <FcCheckmark size={25} />}
          </div>
          <p className="text-sm">{productName}</p>
          {isCollected ? null : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-auto">
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
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductItem;
