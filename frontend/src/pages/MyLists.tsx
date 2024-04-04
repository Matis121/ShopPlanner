import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";
import ListCard from "@/components/Card";
import CardsContainer from "@/components/CardsContainer";

const MyLists = () => {
  return (
    <DefaultLayout>
      <>
        <ContentTitle title="My lists" cardsAmount={1} />
        {/* <EmptyContent
          paragraph="No list has been created yet!"
          button="Create a new list"
        /> */}
        <CardsContainer>
          <ListCard
            name="first"
            description="Lorem impsum 10 lines of signgs"
            status="In progress"
            progressBarPercent={70}
          />
          <ListCard
            name="first"
            description="Lorem impsum 10 lines of signgs"
            status="In progress"
            progressBarPercent={33}
          />
          <ListCard
            name="first"
            description="Lorem impsum 10 lines of signgs"
            status="In progress"
            progressBarPercent={50}
          />
        </CardsContainer>
      </>
    </DefaultLayout>
  );
};

export default MyLists;
