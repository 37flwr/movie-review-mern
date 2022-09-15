import ConfirmPassword from "../components/auth/ConfirmPassword";
import EmailVerification from "../components/auth/EmailVerification";
import ForgetPassword from "../components/auth/ForgetPassword";
import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import Home from "../components/Home";

const publicRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/auth/signin",
    component: <SignInForm />,
  },
  {
    path: "/auth/signup",
    component: <SignUpForm />,
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
    path: "/auth/confirm-password",
    component: <ConfirmPassword />,
  },
];

export { publicRoutes };
