import React, { Dispatch, SetStateAction } from "react";
import ProgressBar from "../ProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateList, updateListInGroup } from "@/api/User";
import { useListHeader } from "@/hooks/list/useListHeader";
import { useProgressBar } from "@/hooks/useProgressBar";
import { useParams } from "@tanstack/react-router";
import { ListData } from "../types/List";

type ListHeaderProps = {
  data: ListData;
  isFetched: boolean;
  listId: string;
};

type ListHeaderViewProps = {
  data: ListData;
  enableEditButton: boolean;
  cardValues: { name: string; desc?: string };
  setCardValues: Dispatch<SetStateAction<{ name: string; desc?: string }>>;
  handleUpdateList: () => void;
  isFetched: boolean;
};

const ListHeaderView: React.FC<ListHeaderViewProps> = ({
  data,
  enableEditButton,
  cardValues,
  setCardValues,
  handleUpdateList,
  isFetched,
}) => {
  const { itemsAmount, percentOfCollectedItems, collectedItemsAmount } =
    useProgressBar(data?.productList, isFetched);

  return (
    <div>
      <Input
        variant="transparent"
        value={cardValues.name}
        onChange={e => setCardValues({ ...cardValues, name: e.target.value })}
        className="font-semibold"
        maxLength={30}
      />
      <Textarea
        placeholder="Description..."
        value={cardValues.desc}
        onChange={e => setCardValues({ ...cardValues, desc: e.target.value })}
        className="mt-4"
        maxLength={120}
      />
      <Button
        disabled={cardValues.name.length === 0}
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

export const ListHeader: React.FC<ListHeaderProps> = ({
  data,
  isFetched,
  listId,
}) => {
  const queryClient = useQueryClient();

  const { enableEditButton, cardValues, setCardValues } = useListHeader(
    data,
    isFetched
  );

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
    <ListHeaderView
      data={data}
      isFetched={isFetched}
      enableEditButton={enableEditButton}
      cardValues={cardValues}
      setCardValues={setCardValues}
      handleUpdateList={handleUpdateList}
    />
  );
};

export const ListHeaderGroup: React.FC<ListHeaderProps> = ({
  data,
  isFetched,
  listId,
}) => {
  const queryClient = useQueryClient();
  const { groupId } = useParams({
    from: "/_authenticated/groups/$groupId/list/$listId",
  });

  const { enableEditButton, cardValues, setCardValues } = useListHeader(
    data,
    isFetched
  );

  const updateListMutation = useMutation({
    mutationFn: updateListInGroup,
    onError: error => {
      console.error("Error updating list:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupLists", listId],
      });
    },
  });

  const handleUpdateList = () => {
    updateListMutation.mutate({
      groupId: groupId,
      listId: listId,
      listName: cardValues.name,
      listDesc: cardValues.desc,
    });
  };

  return (
    <ListHeaderView
      data={data}
      isFetched={isFetched}
      enableEditButton={enableEditButton}
      cardValues={cardValues}
      setCardValues={setCardValues}
      handleUpdateList={handleUpdateList}
    />
  );
};
