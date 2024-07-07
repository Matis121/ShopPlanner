import { createFileRoute } from "@tanstack/react-router";
import Groups from "@/pages/Groups";

export const Route = createFileRoute("/_authenticated/groups/")({
  component: () => (
    <>
      <Groups />
    </>
  ),
});
