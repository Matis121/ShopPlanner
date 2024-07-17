import DefaultLayout from "@/layout/DefaultLayout";
import EmptyContent from "@/components/EmptyContent";
import ContentTitle from "@/components/ContentTitle";
import ListCard from "@/components/cards/ListCard";
import CardsContainer from "@/components/cards/CardsContainer";
import { Input } from "@/components/ui/input";
import AddNewList from "../components/list/AddNewList";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { deleteList, getAllLists } from "@/api/User";
import { useFilterData } from "@/hooks/useFilterData";

type ListItem = {
  _id: number;
  name: string;
  description?: string; // Optional property
  productList: any[];
};

const MyLists = () => {
  const { data, isFetched } = useQuery({
    queryKey: ["lists"],
    queryFn: getAllLists,
  });

  const { filteredData, handleSearchChange } = useFilterData(data, isFetched);

  return (
    <DefaultLayout>
      <>
        <ContentTitle title="My lists" cardsAmount={data ? data.length : 0}>
          <>
            <Input
              type="text"
              placeholder="Search list..."
              className="w-full xl:w-[600px] absolute left-1/2 -translate-x-1/2 top-24 xl:top-auto"
              onChange={handleSearchChange}
            />
            <AddNewList buttonValue="Add new list" />
          </>
        </ContentTitle>
        {isFetched && data.length > 0 ? (
          <CardsContainer contentType="lists">
            {filteredData.map((item: ListItem) => (
              <Link
                to={"/mylists/$id"}
                params={{ id: `${item._id}` }}
                key={item._id}
              >
                <ListCard
                  listData={item}
                  isFetched={isFetched}
                  mutationFn={deleteList}
                  queryKeyProp="list"
                />
              </Link>
            ))}
          </CardsContainer>
        ) : (
          <EmptyContent paragraph="No list has been created yet!">
            <AddNewList buttonValue="Create a new list" />
          </EmptyContent>
        )}
      </>
    </DefaultLayout>
  );
};

export default MyLists;
