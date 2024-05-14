import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";
import Card from "@/components/card/Card";
import CardsContainer from "@/components/card/CardsContainer";
import { Key, useState } from "react";

import { Input } from "@/components/ui/input";
import AddNewList from "../components/list/AddNewList";
import { Link } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import { getAllLists } from "@/api/User";

const MyLists = () => {
  type ListItem = {
    _id: Key;
    name: string;
    description?: string; // Optional property
    productList: any[];
  };

  const { data, isFetched } = useQuery({
    queryKey: ["lists"],
    queryFn: getAllLists,
  });

  // NOT USED AT THIS MOMENT
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <>
      <DefaultLayout>
        <>
          <ContentTitle title="My lists" cardsAmount={data.length}>
            <>
              <Input
                type="text"
                placeholder="Search list..."
                className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <AddNewList buttonValue="Add new list" />
            </>
          </ContentTitle>
          {isFetched && data.length > 0 ? (
            <CardsContainer>
              {data.map((item: ListItem) => (
                <Link
                  to={"/mylists/$id"}
                  params={{ id: `${item._id}` }}
                  key={item._id}
                >
                  <Card
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    itemsAmount={item.productList.length}
                    collectedItemsAmount={collectedItems(item.productList)}
                  />
                </Link>
              ))}
            </CardsContainer>
          ) : (
            <EmptyContent paragraph="No list has been created yet!">
              <AddNewList buttonValue="Create a new list" />
            </EmptyContent>
          )}
        </>
      </DefaultLayout>
    </>
  );
};

export default MyLists;
