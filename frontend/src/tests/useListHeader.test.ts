import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useListHeader } from "../hooks/list/useListHeader";

describe("useListHeader", () => {
  const initialData = {
    _id: 1,
    name: "Initial Name",
    description: "Initial Description",
    productList: [],
  };

  it("should initialize with empty state and edit button disabled", () => {
    const { result } = renderHook(() => useListHeader(initialData, false));

    expect(result.current.cardValues).toEqual({ name: "", desc: "" });
    expect(result.current.enableEditButton).toBe(false);
  });

  it("should set card values when data is fetched", () => {
    const { result } = renderHook(() => useListHeader(initialData, true));

    expect(result.current.cardValues).toEqual({
      name: "Initial Name",
      desc: "Initial Description",
    });
    expect(result.current.enableEditButton).toBe(false);
  });

  it("should enable edit button when card values are changed", () => {
    const { result } = renderHook(() => useListHeader(initialData, true));

    act(() => {
      result.current.setCardValues({
        name: "Modified Name",
        desc: "Initial Description",
      });
    });

    expect(result.current.enableEditButton).toBe(true);
  });

  it("should disable edit button when card values match fetched values", () => {
    const { result } = renderHook(() => useListHeader(initialData, true));

    act(() => {
      result.current.setCardValues({
        name: "Initial Name",
        desc: "Initial Description",
      });
    });

    expect(result.current.enableEditButton).toBe(false);
  });

  it("should not set card values when isFetched is false", () => {
    const { result } = renderHook(() => useListHeader(initialData, false));

    expect(result.current.cardValues).toEqual({ name: "", desc: "" });
    expect(result.current.enableEditButton).toBe(false);
  });
});
