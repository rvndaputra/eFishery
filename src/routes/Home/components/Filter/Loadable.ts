import loadable from "@loadable/component";

const Component = loadable(
  () => import(/* webpackChunkName: "home-filter" */ "./index")
);

export default Component;
