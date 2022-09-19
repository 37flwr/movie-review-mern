import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    base: "",
    confirm: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
    //eslint-disable-next-line
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);

    if (error) {
      navigate("/auth/reset-password", { replace: true });
      setIsValid(false);
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.base.trim().length < 8)
      return updateNotification(
        "error",
        "Password must be at least 8 characters long"
      );

    if (!password.base.trim()) {
      return updateNotification("error", "Password is missing");
    }

    if (password.base !== password.confirm)
      return updateNotification("error", "Passwords do not match");

    const { error, message } = await resetPassword({
      newPassword: password.base,
      userId: id,
      token,
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait, we are verifying your token
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry, the token is invalid
          </h1>
        </Container>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={classNames(commonModalClasses, "w-96")}
        >
          <FormTitle>Enter new password</FormTitle>
          <FormInput
            name="base"
            placeholder="********"
            label="New password"
            type="password"
            value={password.base}
            onChange={handleChange}
          />
          <FormInput
            name="confirm"
            placeholder="********"
            label="Confirm password"
            type="password"
            value={password.confirm}
            onChange={handleChange}
          />

          <SubmitButton value="Confirm password" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ResetPassword;
