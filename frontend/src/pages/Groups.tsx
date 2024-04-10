import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";

import { Input } from "@/components/ui/input";
import AddNewList from "../components/AddNewList";

const Groups = () => {
  return (
    <DefaultLayout>
      <>
        <ContentTitle title="Groups" cardsAmount={0}>
          <>
            <Input
              type="text"
              placeholder="Search list..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
            />
            <AddNewList />
          </>
        </ContentTitle>
        <EmptyContent
          paragraph="No group has been created yet!"
          button="Create a new group"
        />
      </>
    </DefaultLayout>
  );
};

export default Groups;
