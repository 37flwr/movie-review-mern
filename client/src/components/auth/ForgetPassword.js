import classNames from "classnames";
import React, { useState } from "react";
import { forgetPassword } from "../../api/auth";
import { useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/formElements/FormContainer";
import FormInput from "../form/formElements/FormInput";
import FormTitle from "../form/formElements/FormTitle";
import SubmitButton from "../form/formElements/SubmitButton";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email");

    const { error, message } = await forgetPassword(email);
    if (error) {
      return updateNotification("error", error);
    }

    updateNotification("success", message);
  };

  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={classNames(commonModalClasses, "w-96")}
        >
          <FormTitle>Please enter your email</FormTitle>
          <FormInput
            value={email}
            onChange={handleChange}
            name="email"
            placeholder="john@email.com"
            label="Email"
          />
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
