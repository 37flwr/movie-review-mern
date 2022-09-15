import classNames from "classnames";
import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const ForgetPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={classNames(commonModalClasses, "w-96")}>
          <FormTitle>Please enter your email</FormTitle>
          <FormInput name="email" placeholder="john@email.com" label="Email" />
          <SubmitButton value="Send Link" />

          <div className="flex justify-between">
            <CustomLink path="/auth/signin">Sign in</CustomLink>
            <CustomLink path="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;
