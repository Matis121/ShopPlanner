import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";

import { Input } from "@/components/ui/input";
import AddNewList from "../components/lists/AddNewList";
import CardsContainer from "@/layout/CardsContainer";
import GroupCard from "@/components/groups/GroupCard";

const Groups = () => {
  return (
    <DefaultLayout>
      <>
        <ContentTitle title="Groups" cardsAmount={2}>
          <>
            <Input
              type="text"
              placeholder="Search group..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
            />
            <AddNewList buttonValue="Add new group" />
          </>
        </ContentTitle>
        <CardsContainer>
          <GroupCard />
        </CardsContainer>
        {/* <EmptyContent paragraph="No group has been created yet!">
          <AddNewList buttonValue="Create a new group" />
        </EmptyContent> */}
      </>
    </DefaultLayout>
  );
};

export default Groups;
