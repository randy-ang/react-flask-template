import { HOME_PATH } from "@url";
import loadable from "@loadable/component";

const HomeView = loadable(() =>
  import(/* webpackChunkName: 'home-view' */ "./HomeView")
);

const HomeRoute = {
  path: HOME_PATH,
  component: HomeView,
};

export default HomeRoute;
