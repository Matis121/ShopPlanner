export function useProgressBar(itemsList: any[], isFetched: boolean) {
  const itemsAmount = itemsList?.length;
  let percentOfCollectedItems: number = 0;
  let collectedItemsAmount: number = 0;

  if (isFetched) {
    itemsList.map(item => {
      if (item.isCollected) {
        collectedItemsAmount++;
      }
    });
    if (itemsAmount > 0) {
      percentOfCollectedItems = parseFloat(
        ((collectedItemsAmount / itemsAmount) * 100).toFixed(0)
      );
    }
  }

  return { itemsAmount, percentOfCollectedItems, collectedItemsAmount };
}
