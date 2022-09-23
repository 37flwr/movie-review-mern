import EmailVerification from "../components/auth/EmailVerification";
import ForgetPassword from "../components/auth/ForgetPassword";
import ResetPassword from "../components/auth/ResetPassword";
import SignInPage from "../components/auth/SignInPage";
import SignUpPage from "../components/auth/SignUpPage";
import NotFound from "../components/fallback/NotFound";
import Home from "../components/Home";

const publicRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/auth/signin",
    component: <SignInPage />,
  },
  {
    path: "/auth/signup",
    component: <SignUpPage />,
  },
  {
    path: "/auth/verification",
    component: <EmailVerification />,
  },
  {
    path: "/auth/forget-password",
    component: <ForgetPassword />,
  },
  {
    path: "/auth/reset-password",
    component: <ResetPassword />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export { publicRoutes };
