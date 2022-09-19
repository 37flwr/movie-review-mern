import Actors from "../admin/Actors";
import Dashboard from "../admin/Dashboard";
import Movies from "../admin/Movies";
import NotFound from "../components/NotFound";

export const adminRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/movies",
    component: <Movies />,
  },
  {
    path: "/actors",
    component: <Actors />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];
