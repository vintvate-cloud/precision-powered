import { createFileRoute, redirect } from "@tanstack/react-router";

// Old "Explore Our Products" link target on the original site.
export const Route = createFileRoute("/shopengine-template/$id")({
  beforeLoad: () => {
    throw redirect({ to: "/shop", statusCode: 301 });
  },
});
