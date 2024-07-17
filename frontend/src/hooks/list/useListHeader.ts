import { ListData } from "@/components/types/List";
import { useEffect, useState } from "react";

type StateData = {
  name: string;
  desc?: string;
};

export function useListHeader(data: ListData, isFetched: boolean) {
  const [fetchedCardValues, setFetchedCardValues] = useState<StateData>({
    name: "",
    desc: "",
  });
  const [cardValues, setCardValues] = useState<StateData>({
    name: "",
    desc: "",
  });
  const [enableEditButton, setEnableEditButton] = useState(false);

  useEffect(() => {
    if (isFetched) {
      setCardValues({ name: data.name, desc: data.description });
      setFetchedCardValues({ name: data.name, desc: data.description });
    }
  }, [data]);

  useEffect(() => {
    if (
      cardValues.name !== fetchedCardValues.name ||
      cardValues.desc !== fetchedCardValues.desc
    ) {
      return setEnableEditButton(true);
    }
    setEnableEditButton(false);
  }, [cardValues, fetchedCardValues]);

  return { enableEditButton, cardValues, setCardValues };
}
