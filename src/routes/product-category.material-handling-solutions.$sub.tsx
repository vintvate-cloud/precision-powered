import { createFileRoute, redirect } from "@tanstack/react-router";

// Preserves the original nested sub-category URLs.
export const Route = createFileRoute("/product-category/material-handling-solutions/$sub")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/product-category/$slug", params: { slug: params.sub }, statusCode: 301 });
  },
});
