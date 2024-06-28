import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";

import { Input } from "@/components/ui/input";
import CardsContainer from "@/components/CardsContainer";
import GroupCard from "@/components/groups/GroupCard";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "@/api/User";
import { Link } from "@tanstack/react-router";
import AddNewGroup from "@/components/groups/AddNewGroup";

const Groups = () => {
  const { data, isFetched } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });
  return (
    <DefaultLayout>
      <>
        <ContentTitle title="Groups" cardsAmount={data ? data.length : 0}>
          <>
            <Input
              type="text"
              placeholder="Search group..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
            />
            <AddNewGroup buttonValue="Add new group" />
          </>
        </ContentTitle>
        {isFetched && data.length > 0 ? (
          <CardsContainer contentType="groups">
            {data.map(item => (
              <div>
                <Link
                  to={"/groups/$groupId"}
                  params={{ groupId: item._id }}
                  key={item._id}
                ></Link>
                <GroupCard
                  href="/groups/$groupId"
                  name={item.name}
                  description={item.description}
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
