import DefaultLayout from "../layout/DefaultLayout";
import ContentTitle from "../components/ContentTitle";
import EmptyContent from "../components/EmptyContent";
import { Input } from "../components/ui/input";
import { Link } from "@tanstack/react-router";
import { deleteListInGroup, getGroupLists } from "@/api/User";
import { useQuery } from "@tanstack/react-query";
import ListCard from "@/components/lists/ListCard";
import CardsContainer from "@/components/CardsContainer";
import AddListInGroup from "@/components/groups/AddListInGroup";

const ListsInGroup = ({ groupId }) => {
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
          title={`Group: ${data ? data.groupName : ""}`}
          cardsAmount={data ? data.length : 0}
        >
          <>
            <Input
              type="text"
              placeholder="Search list..."
              className="w-full xl:w-[500px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
            />
            <AddListInGroup buttonValue="Add new list" groupId={groupId} />
          </>
        </ContentTitle>
        {isFetched && data.listsInGroup.length > 0 ? (
          <CardsContainer contentType="lists">
            {data.listsInGroup.map(item => (
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
                  mutationFn={deleteListInGroup}
                  queryKeyProp="group"
                  groupId={groupId}
                />
              </Link>
            ))}
          </CardsContainer>
        ) : (
          <EmptyContent paragraph="No list has been created yet!">
            <AddListInGroup buttonValue="Add new list" groupId={groupId} />
          </EmptyContent>
        )}
      </>
    </DefaultLayout>
  );
};

export default ListsInGroup;
