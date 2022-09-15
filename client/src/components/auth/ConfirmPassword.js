import classNames from "classnames";
import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const ConfirmPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={classNames(commonModalClasses, "w-96")}>
          <FormTitle>Enter new password</FormTitle>
          <FormInput
            name="password"
            placeholder="********"
            label="New password"
            type="password"
          />
          <FormInput
            name="confirmPassword"
            placeholder="********"
            label="Confirm password"
            type="password"
          />

          <SubmitButton value="Confirm password" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPassword;
