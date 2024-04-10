import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";
import ListCard from "@/components/Card";
import CardsContainer from "@/components/CardsContainer";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import AddNewList from "../components/AddNewList";

const MyLists = () => {
  const [list, setList] = useState([
    {
      id: 1,
      name: "my",
      description: "test",
      status: "In progress",
      progressBarPercent: 0,
    },
    {
      id: 2,
      name: "firstelement",
      description: "test",
      status: "In progress",
      progressBarPercent: 0,
    },
    {
      id: 3,
      name: "element",
      description: "test",
      status: "In progress",
      progressBarPercent: 80,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DefaultLayout>
      <>
        <ContentTitle title="My lists" cardsAmount={1}>
          <>
            <Input
              type="text"
              placeholder="Search list..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <AddNewList />
          </>
        </ContentTitle>
        {list.length > 0 ? (
          <CardsContainer>
            {filteredList.map(item => (
              <ListCard
                key={item.id}
                name={item.name}
                description={item.description}
                status={item.status}
                progressBarPercent={item.progressBarPercent}
              />
            ))}
          </CardsContainer>
        ) : (
          <EmptyContent
            paragraph="No list has been created yet!"
            button="Create a new list"
          />
        )}
      </>
    </DefaultLayout>
  );
};

export default MyLists;
