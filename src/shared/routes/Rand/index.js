import { RAND_PATH } from "@url";
import loadable from "@loadable/component";

const RandView = loadable(() =>
  import(/* webpackChunkName: 'rand-view' */ "./RandView")
);

const RandRoute = {
  path: RAND_PATH,
  component: RandView,
};

export default RandRoute;
