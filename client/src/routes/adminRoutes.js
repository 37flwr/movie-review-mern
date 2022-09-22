import Actors from "../components/admin/pages/Actors";
import Dashboard from "../components/admin/pages/Dashboard";
import Movies from "../components/admin/pages/Movies";
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
