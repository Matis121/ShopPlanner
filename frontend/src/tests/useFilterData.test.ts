import { renderHook, act } from "@testing-library/react";
import { useFilterData } from "../hooks/useFilterData";
import { describe, it, expect } from "vitest";

const mockData = [
  { _id: 1, name: "Apple", productList: [] },
  { _id: 2, name: "Banana", productList: [] },
  { _id: 3, name: "Orange", productList: [] },
];

describe("useFilterData", () => {
  it("should initialize with empty searchQuery and filteredData when isFetched is false", () => {
    const { result } = renderHook(() => useFilterData(mockData, false));

    expect(result.current.filteredData).toEqual([]);
  });

  it("should set filteredData to the provided data when isFetched is true", () => {
    const { result } = renderHook(() => useFilterData(mockData, true));

    expect(result.current.filteredData).toEqual(mockData);
  });

  it("should filter data based on the searchQuery", () => {
    const { result } = renderHook(() => useFilterData(mockData, true));

    act(() => {
      result.current.handleSearchChange({
        target: { value: "ap" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.filteredData).toEqual([
      { _id: 1, name: "Apple", productList: [] },
    ]);
  });

  it("should return the full data set when searchQuery is empty", () => {
    const { result } = renderHook(() => useFilterData(mockData, true));

    act(() => {
      result.current.handleSearchChange({
        target: { value: "ap" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.filteredData).toEqual([
      { _id: 1, name: "Apple", productList: [] },
    ]);

    act(() => {
      result.current.handleSearchChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.filteredData).toEqual(mockData);
  });

  it("should update filteredData when new data is provided", () => {
    const { result, rerender } = renderHook(
      ({ data, isFetched }) => useFilterData(data, isFetched),
      {
        initialProps: { data: mockData, isFetched: true },
      }
    );

    expect(result.current.filteredData).toEqual(mockData);

    const newData = [
      { _id: 4, name: "Grape", productList: [] },
      { _id: 5, name: "Pineapple", productList: [] },
    ];

    rerender({ data: newData, isFetched: true });

    expect(result.current.filteredData).toEqual(newData);
  });
});
