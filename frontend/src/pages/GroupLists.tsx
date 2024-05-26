import DefaultLayout from "../layout/DefaultLayout";
import ContentTitle from "../components/ContentTitle";
import EmptyContent from "../components/EmptyContent";
import { Input } from "../components/ui/input";
import { Link } from "@tanstack/react-router";
import { getGroupLists } from "@/api/User";
import { useQuery } from "@tanstack/react-query";
import ListCard from "@/components/lists/ListCard";
import CardsContainer from "@/layout/CardsContainer";
import HandleListInGroup from "@/components/groups/HandleListInGroup";

const GroupLists = ({ groupId }) => {
  // fetch data
  const { data, isFetched } = useQuery({
    queryKey: ["groupLists", groupId],
    queryFn: () => getGroupLists(groupId),
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
        <ContentTitle
          title={`Group: ${groupId}`}
          cardsAmount={data ? data.length : 0}
        >
          <>
            <Input
              type="text"
              placeholder="Search list..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
            />
            <HandleListInGroup buttonValue="Add new list" groupId={groupId} />
          </>
        </ContentTitle>
        {isFetched && data.length > 0 ? (
          <CardsContainer>
            {data.map(item => (
              <Link
                to={"/groups/$groupId/list/$listId"}
                params={{ listId: `${item._id}` }}
                key={item._id}
              >
                <ListCard
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
            <HandleListInGroup buttonValue="Add new list" groupId={groupId} />
          </EmptyContent>
        )}
      </>
    </DefaultLayout>
  );
};

export default GroupLists;
