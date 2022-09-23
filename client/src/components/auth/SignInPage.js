import classNames from "classnames";
import React, { useState } from "react";
import { useAuth, useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import { isValidEmail } from "../../utils/validator";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/formElements/FormContainer";
import FormInput from "../form/formElements/FormInput";
import FormTitle from "../form/formElements/FormTitle";
import SubmitButton from "../form/formElements/SubmitButton";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Name is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const SignInPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending } = authInfo;

  const handleChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    handleLogin(email, password);
  };

  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={classNames(commonModalClasses, "w-72")}
        >
          <FormTitle>Sign in</FormTitle>
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
          <SubmitButton value="Sign in" busy={isPending} />

          <div className="flex justify-between">
            <CustomLink path="/auth/forget-password">
              Forget password
            </CustomLink>
            <CustomLink path="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignInPage;
