import DefaultLayout from "../layout/DefaultLayout";
import ContentTitle from "../components/ContentTitle";
import EmptyContent from "../components/EmptyContent";
import { Input } from "../components/ui/input";
import { Link } from "@tanstack/react-router";
import { deleteListInGroup, getGroupLists } from "@/api/User";
import { useQuery } from "@tanstack/react-query";
import ListCard from "@/components/cards/ListCard";
import CardsContainer from "@/components/cards/CardsContainer";
import AddListInGroup from "@/components/group/AddListInGroup";
import { useFilterData } from "@/hooks/useFilterData";

type ListItem = {
  _id: number;
  name: string;
  description?: string; // Optional property
  productList: any[];
};

type ListsInGroupProps = {
  groupId: number;
};

const ListsInGroup: React.FC<ListsInGroupProps> = ({ groupId }) => {
  // fetch data
  const { data, isFetched } = useQuery({
    queryKey: ["groupLists", groupId],
    queryFn: () => getGroupLists(groupId),
  });

  const { filteredData, handleSearchChange } = useFilterData(
    data?.listsInGroup,
    isFetched
  );

  return (
    <DefaultLayout>
      <>
        <ContentTitle
          title={`Group: ${data ? data.groupName : ""}`}
          cardsAmount={data ? data.listsInGroup.length : 0}
        >
          <>
            <Input
              type="text"
              placeholder="Search list..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
              onChange={handleSearchChange}
            />
            <AddListInGroup buttonValue="Add new list" groupId={groupId} />
          </>
        </ContentTitle>
        {isFetched && data && data.listsInGroup.length > 0 ? (
          <CardsContainer contentType="lists">
            {filteredData.map((item: ListItem) => (
              <Link
                to={"/groups/$groupId/list/$listId"}
                params={{ groupId: `${groupId}`, listId: `${item._id}` }}
                key={item._id}
              >
                <ListCard
                  listData={item}
                  isFetched={isFetched}
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
