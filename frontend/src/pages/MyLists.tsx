import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";

const MyLists = () => {
  return (
    <DefaultLayout>
      <>
        <ContentTitle title="My lists" />
        <EmptyContent
          paragraph="No list has been created yet!"
          button="Create a new list"
        />
      </>
    </DefaultLayout>
  );
};

export default MyLists;
