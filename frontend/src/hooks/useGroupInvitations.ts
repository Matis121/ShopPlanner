import { useQuery } from "@tanstack/react-query";
import { getGroupInvitations } from "@/api/User";

export function useGroupInvitations() {
  const { data } = useQuery({
    queryKey: ["groupInvitations"],
    queryFn: getGroupInvitations,
  });

  return { data };
}
