import classNames from "classnames";
import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const SignInForm = () => {
  return (
    <FormContainer>
      <Container>
        <form className={classNames(commonModalClasses, "w-72")}>
          <FormTitle>Sign in</FormTitle>
          <FormInput name="email" placeholder="john@email.com" label="Email" />
          <FormInput name="password" placeholder="********" label="Password" />
          <SubmitButton value="Sign in" />

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

export default SignInForm;
