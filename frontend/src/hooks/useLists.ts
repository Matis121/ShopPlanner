import { useState, useEffect } from "react";

export function useLists(data, isFetched) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const collectedItems = (arrayOfItems: any[]) => {
    let collectedItemsAmount = 0;
    arrayOfItems.map(item => {
      if (item.isCollected) {
        collectedItemsAmount++;
      }
    });
    return collectedItemsAmount;
  };

  useEffect(() => {
    if (isFetched) {
      console.log( data);
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isFetched) {
      console.log(data);
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  return { searchQuery, filteredData, handleSearchChange, collectedItems };
}
