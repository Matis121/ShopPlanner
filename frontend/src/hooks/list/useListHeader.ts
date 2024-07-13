import { useEffect, useState } from "react";

export function useListHeader(data, isFetched) {
  const [fetchedCardValues, setFetchedCardValues] = useState({
    name: "",
    desc: "",
  });
  const [cardValues, setCardValues] = useState({ name: "", desc: "" });
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
