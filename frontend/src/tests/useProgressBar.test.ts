import { describe, it, expect } from "vitest";
import { useProgressBar } from "../hooks/useProgressBar";

describe("useProgressBar", () => {
  it("should return 0 values when isFetched is false", () => {
    const itemsList = [{ isCollected: true }, { isCollected: false }];
    const isFetched = false;

    const result = useProgressBar(itemsList, isFetched);

    expect(result.itemsAmount).toBe(2);
    expect(result.collectedItemsAmount).toBe(0);
    expect(result.percentOfCollectedItems).toBe(0);
  });

  it("should return 0 values when itemsList is empty", () => {
    const itemsList: any[] = [];
    const isFetched = true;

    const result = useProgressBar(itemsList, isFetched);

    expect(result.itemsAmount).toBe(0);
    expect(result.collectedItemsAmount).toBe(0);
    expect(result.percentOfCollectedItems).toBe(0);
  });

  it("should calculate correctly when all items are collected", () => {
    const itemsList = [{ isCollected: true }, { isCollected: true }];
    const isFetched = true;

    const result = useProgressBar(itemsList, isFetched);

    expect(result.itemsAmount).toBe(2);
    expect(result.collectedItemsAmount).toBe(2);
    expect(result.percentOfCollectedItems).toBe(100);
  });

  it("should calculate correctly when some items are collected", () => {
    const itemsList = [{ isCollected: true }, { isCollected: false }];
    const isFetched = true;

    const result = useProgressBar(itemsList, isFetched);

    expect(result.itemsAmount).toBe(2);
    expect(result.collectedItemsAmount).toBe(1);
    expect(result.percentOfCollectedItems).toBe(50);
  });

  it("should calculate correctly when no items are collected", () => {
    const itemsList = [{ isCollected: false }, { isCollected: false }];
    const isFetched = true;

    const result = useProgressBar(itemsList, isFetched);

    expect(result.itemsAmount).toBe(2);
    expect(result.collectedItemsAmount).toBe(0);
    expect(result.percentOfCollectedItems).toBe(0);
  });
});
