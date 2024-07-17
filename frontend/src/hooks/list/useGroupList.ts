import { getSingleListInGroup } from "@/api/User";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

export function useList() {
  const navigate = useNavigate();
  const urlParams = useParams({
    from: "/_authenticated/groups/$groupId/list/$listId",
  });
  const listId = urlParams.listId;
  const groupId = urlParams.groupId;

  const handleBackgroundClick = () => {
    navigate({
      to: "/groups/$groupId",
      params: { groupId },
    });
  };
  const handleExit = () => {
    navigate({ to: "/groups/$groupId", params: { groupId } });
  };

  const { data, isFetched } = useQuery({
    queryKey: ["groupLists", listId],
    queryFn: () =>
      getSingleListInGroup({
        listId,
        groupId,
      }),
  });

  return { data, isFetched, listId, handleBackgroundClick, handleExit };
}
