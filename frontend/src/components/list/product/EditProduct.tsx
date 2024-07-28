import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

type EditProductProps = {
  handleEditProduct: () => void;
  editProductValues: { productName: string; productAmount: number };
  setEditProductValues: Dispatch<
    SetStateAction<{ productName: string; productAmount: number }>
  >;
  productEditStatus: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const EditProduct: React.FC<EditProductProps> = ({
  handleEditProduct,
  editProductValues,
  setEditProductValues,
  productEditStatus,
  isOpen,
  setIsOpen,
}) => {
  useEffect(() => {
    if (productEditStatus === "success") {
      setIsOpen(false);
    }
  }, [productEditStatus]);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="mb-4">
              <p>Edit product</p>
            </DrawerTitle>
            <DrawerDescription className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editProductValues.productName}
                  onChange={e =>
                    setEditProductValues({
                      ...editProductValues,
                      productName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="qty">Quantity</Label>
                <Input
                  id="qty"
                  type="number"
                  value={editProductValues.productAmount}
                  onChange={e =>
                    setEditProductValues({
                      ...editProductValues,
                      productAmount: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-row items-center gap-4 justify-center mb-6">
            <Button className="w-[60%]" onClick={handleEditProduct}>
              {productEditStatus === "pending" ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </div>
              ) : (
                "Apply changes"
              )}
            </Button>
            <DrawerClose className="w-[40%]">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProduct;
