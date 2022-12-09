import loadable from "@loadable/component";

const Component = loadable(
  () => import(/* webpackChunkName: "home-list-card-view" */ "./index")
);

export default Component;
