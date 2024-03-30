import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";

const Groups = () => {
  return (
    <DefaultLayout>
      <>
        <ContentTitle title="Groups" />
        <EmptyContent
          paragraph="No group has been created yet!"
          button="Create a new group"
        />
      </>
    </DefaultLayout>
  );
};

export default Groups;
