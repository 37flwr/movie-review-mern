import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z 0-9]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Name is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = userInfo;

  const handleChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await createUser(userInfo);
    if (response.error) return updateNotification("error", response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={classNames(commonModalClasses, "w-72")}
        >
          <FormTitle>Sign up</FormTitle>
          <FormInput
            value={name}
            onChange={handleChange}
            name="name"
            placeholder="John Doe"
            label="Name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            name="email"
            placeholder="john@email.com"
            label="Email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            name="password"
            placeholder="********"
            label="Password"
            type="password"
          />
          <SubmitButton value="Sign up" />

          <div className="flex justify-between">
            <CustomLink path="/auth/forget-password">
              Forget password
            </CustomLink>
            <CustomLink path="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignUpPage;
