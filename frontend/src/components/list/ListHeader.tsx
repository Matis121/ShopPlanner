import ProgressBar from "../ProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateList } from "@/api/User";
import { useListHeader } from "@/hooks/list/useListHeader";
import { useProgressBar } from "@/hooks/useProgressBar";

type ListHeader = {
  data: { productList: object };
  isFetched: boolean;
  listId: string;
};

const ListHeader: React.FC<ListHeader> = ({ data, isFetched, listId }) => {
  const queryClient = useQueryClient();
  const { enableEditButton, cardValues, setCardValues } = useListHeader(
    data,
    isFetched
  );
  const { itemsAmount, percentOfCollectedItems, collectedItemsAmount } =
    useProgressBar(data?.productList, isFetched);

  const updateListMutation = useMutation({
    mutationFn: updateList,
    onError: error => {
      console.error("Error updating list:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", listId] });
    },
  });

  const handleUpdateList = () => {
    updateListMutation.mutate({
      listId: listId,
      listName: cardValues.name,
      listDesc: cardValues.desc,
    });
  };

  return (
    <div>
      <Input
        variant="transparent"
        value={cardValues.name}
        onChange={e => setCardValues({ ...cardValues, name: e.target.value })}
        className="font-semibold"
      />
      <Textarea
        placeholder="Description..."
        value={cardValues.desc}
        onChange={e => setCardValues({ ...cardValues, desc: e.target.value })}
        className="mt-4"
      />
      <Button
        className={`self-start mt-6 ${enableEditButton ? null : "hidden"}`}
        onClick={handleUpdateList}
      >
        Save
      </Button>
      <ProgressBar
        itemsAmount={itemsAmount}
        collectedItemsAmount={collectedItemsAmount}
        progressBarPercent={percentOfCollectedItems}
      />
    </div>
  );
};

export default ListHeader;
