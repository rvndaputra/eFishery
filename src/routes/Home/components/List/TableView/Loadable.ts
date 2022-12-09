import loadable from "@loadable/component";

const Component = loadable(
  () => import(/* webpackChunkName: "home-list-table-view" */ "./index")
);

export default Component;
