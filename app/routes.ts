import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/search.tsx"),
  route("character/:id", "routes/character.$id.tsx"),
] satisfies RouteConfig;
