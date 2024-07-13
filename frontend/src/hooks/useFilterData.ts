import { useState, useEffect } from "react";

type DataItem = {
  name: string;
};

export function useFilterData(data: DataItem[], isFetched: boolean) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (isFetched) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isFetched) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  return { filteredData, handleSearchChange };
}
