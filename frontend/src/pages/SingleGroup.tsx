import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import ContentTitle from "../components/ContentTitle";
import EmptyContent from "../components/EmptyContent";
import { Input } from "../components/ui/input";
import AddNewList from "../components/lists/AddNewList";
import { useParams } from "@tanstack/react-router";
import { getGroupLists } from "@/api/User";
import { useQuery } from "@tanstack/react-query";
import ListCard from "@/components/lists/ListCard";
import CardsContainer from "@/layout/CardsContainer";

const GroupLists = () => {
  const groupId = useParams({ from: "/groups/$id" });

  // fetch data
  const { data, isFetched } = useQuery({
    queryKey: ["groupLists", groupId.id],
    queryFn: () => getGroupLists(groupId.id),
  });

  // collected items

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
    <DefaultLayout>
      <>
        <ContentTitle title={`Group: ${groupId.id}`} cardsAmount={0}>
          <>
            <Input
              type="text"
              placeholder="Search list..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
            />
            <AddNewList buttonValue="Add new list" />
          </>
        </ContentTitle>
        {isFetched && data.length > 0 ? (
          <CardsContainer>
            {data.map(item => (
              <ListCard
                id={item._id}
                name={item.name}
                description={item.description}
                itemsAmount={item.productList.length}
                collectedItemsAmount={collectedItems(item.productList)}
              />
            ))}
          </CardsContainer>
        ) : (
          <EmptyContent paragraph="No list has been created yet!">
            <AddNewList buttonValue="Create a new list" />
          </EmptyContent>
        )}
      </>
    </DefaultLayout>
  );
};

export default GroupLists;
