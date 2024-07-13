export function useProgressBar(itemsList, isFetched) {
  const itemsAmount = itemsList?.length;
  let percentOfCollectedItems: number = 0;
  let collectedItemsAmount: number = 0;

  if (isFetched) {
    itemsList.map(item => {
      if (item.isCollected) {
        collectedItemsAmount++;
      }
    });
    percentOfCollectedItems = parseFloat(
      ((collectedItemsAmount / itemsAmount) * 100).toFixed(0)
    );
  }

  return { itemsAmount, percentOfCollectedItems, collectedItemsAmount };
}
