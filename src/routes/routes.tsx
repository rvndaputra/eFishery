import type { RouteObject } from "react-router-dom";

import Home from "./Home";

const Routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export default Routes;
