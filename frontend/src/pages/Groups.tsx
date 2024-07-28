import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";
import { Input } from "@/components/ui/input";
import CardsContainer from "@/components/cards/CardsContainer";
import GroupCard from "@/components/cards/GroupCard";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "@/api/User";
import { Link } from "@tanstack/react-router";
import AddNewGroup from "@/components/group/AddNewGroup";
import { useFilterData } from "@/hooks/useFilterData";
import GroupSkeleton from "@/components/skielet/GroupSkeleton";

const Groups = () => {
  const { data, isFetched } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });

  const { filteredData, handleSearchChange } = useFilterData(data, isFetched);

  return (
    <DefaultLayout>
      <>
        <ContentTitle title="Groups" cardsAmount={data ? data.length : 0}>
          <>
            <Input
              type="text"
              placeholder="Search group..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
              onChange={handleSearchChange}
            />
            <AddNewGroup buttonValue="Add new group" />
          </>
        </ContentTitle>
        {!isFetched ? (
          <GroupSkeleton qty={2} />
        ) : data.length > 0 ? (
          <CardsContainer contentType="groups">
            {filteredData.map(item => (
              <div key={item._id}>
                <Link
                  to={"/groups/$groupId"}
                  params={{ groupId: `${item._id}` }}
                  key={item._id}
                ></Link>
                <GroupCard
                  name={item.name}
                  description={item.description || ""}
                  usersAmount={item.users.length ? item.users.length : 0}
                  listsAmount={item.lists.length ? item.lists.length : 0}
                  groupId={item._id}
                />
              </div>
            ))}
          </CardsContainer>
        ) : (
          <EmptyContent paragraph="No group has been created yet!">
            <AddNewGroup buttonValue="Create a new group" />
          </EmptyContent>
        )}
      </>
    </DefaultLayout>
  );
};

export default Groups;
