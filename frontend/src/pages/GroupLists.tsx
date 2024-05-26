import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import ContentTitle from "../components/ContentTitle";
import EmptyContent from "../components/EmptyContent";
import { Input } from "../components/ui/input";
import AddNewList from "../components/lists/AddNewList";
import { useParams } from "@tanstack/react-router";

const GroupLists = () => {
  const groupId = useParams({ from: "/groups/$id" });
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
        <EmptyContent paragraph="No list has been created yet!">
          <AddNewList buttonValue="Create a new list" />
        </EmptyContent>
      </>
    </DefaultLayout>
  );
};

export default GroupLists;
