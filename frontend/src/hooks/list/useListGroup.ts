import { getSingleListInGroup } from "@/api/User";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

export function useListGroup() {
  const navigate = useNavigate();
  const { groupId, listId } = useParams({
    from: "/_authenticated/groups/$groupId/list/$listId",
  });

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      navigate({
        to: "/groups/$groupId",
        params: { groupId },
      });
    }
  };
  const handleExit = () => {
    navigate({ to: "/groups/$groupId", params: { groupId } });
  };

  const { data, isFetched } = useQuery({
    queryKey: ["groupLists", listId],
    queryFn: () =>
      getSingleListInGroup({
        listId: listId,
        groupId: groupId,
      }),
  });

  return { data, isFetched, listId, handleBackgroundClick, handleExit };
}
