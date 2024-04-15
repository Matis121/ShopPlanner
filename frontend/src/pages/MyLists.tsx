import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";
import Card from "@/components/card/Card";
import CardsContainer from "@/components/card/CardsContainer";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import AddNewList from "../components/list/AddNewList";
import { Link } from "@tanstack/react-router";

const MyLists = () => {
  type ListItem = {
    id: number;
    name: string;
    description?: string; // Optional property
    status: string;
    progressBarPercent: number;
  };

  const [list, setList] = useState([
    {
      id: 1,
      name: "This is my first list",
      status: "In progress",
      progressBarPercent: 0,
    },
    {
      id: 2,
      name: "firstelement",
      description: "testowe",
      status: "In progress",
      progressBarPercent: 0,
    },
    {
      id: 3,
      name: "element",
      status: "In progress",
      progressBarPercent: 80,
    },
  ]);

  // Remove after connect to backend
  const handleNewItem = (newItem: ListItem) => {
    setList(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (removeItem: number) => {
    setList(prev => prev.filter(item => item.id !== removeItem));
  };
  //
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
              <AddNewList handleNewItem={(e: ListItem) => handleNewItem(e)} />
            </>
          </ContentTitle>
          {list.length > 0 ? (
            <CardsContainer>
              {filteredList.map(item => (
                <Link
                  to={"/mylists/$id"}
                  params={{ id: `${item.id}` }}
                  key={item.id}
                >
                  <Card
                    name={item.name}
                    description={item.description}
                    status={item.status}
                    progressBarPercent={item.progressBarPercent}
                    handleRemoveItem={() => handleRemoveItem(item.id)}
                  />
                </Link>
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
    </>
  );
};

export default MyLists;
