import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/utils/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
