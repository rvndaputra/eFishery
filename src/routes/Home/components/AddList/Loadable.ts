import loadable from "@loadable/component";

const Component = loadable(
  () => import(/* webpackChunkName: "home-add-list" */ "./index")
);

export default Component;
