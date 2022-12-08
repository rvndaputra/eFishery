import loadable from "@loadable/component";

const Component = loadable(
  () => import(/* webpackChunkName: "home" */ "./Home")
);

export default Component;
