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
          {isFetched ? (
            <CardsContainer>
              {data.map((item: ListItem) => (
                <Link
                  to={"/mylists/$id"}
                  params={{ id: `${item._id}` }}
                  key={item._id}
                >
                  <Card
                    name={item.name}
                    description={item.description}
                    itemsAmount={item.productList.length}
                    collectedItemsAmount={collectedItems(item.productList)}
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
