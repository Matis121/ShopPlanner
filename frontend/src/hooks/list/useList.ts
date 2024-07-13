import { getSingleList } from "@/api/User";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

export function useList() {
  const navigate = useNavigate();
  const urlParams = useParams({ from: "/_authenticated/mylists/$id" });
  const listId = urlParams.id;

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      navigate({ to: "/mylists" });
    }
  };
  const handleExit = () => {
    navigate({ to: "/mylists" });
  };

  const { data, isFetched } = useQuery({
    queryKey: ["lists", listId],
    queryFn: () => getSingleList(listId),
  });

  return { data, isFetched, listId, handleBackgroundClick, handleExit };
}
