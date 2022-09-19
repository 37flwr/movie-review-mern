import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIdx, setActiveOtpIdx] = useState(0);

  const inputRef = useRef();
  const { updateNotification } = useNotification();
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const focusNextInputField = (idx) => {
    setActiveOtpIdx(idx + 1);
  };

  const focusPrevInputField = (idx) => {
    let nextIdx;
    const diff = idx - 1;
    nextIdx = diff !== 0 ? diff : 0;
    setActiveOtpIdx(nextIdx);
  };

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(currentOTPIndex);
    else focusNextInputField(currentOTPIndex);

    setOtp([...newOtp]);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification("error", "Invalid OTP");

    // Submit OTP
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });

    if (error) return updateNotification("error", error);
    updateNotification("success", message);

    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  const handleOtpResend = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIdx]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
    //eslint-disable-next-line
  }, [user, isLoggedIn, isVerified]);

  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={classNames(commonModalClasses)}
        >
          <div>
            <FormTitle>Please enter the OTP to verify your account</FormTitle>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4 ">
            {otp.map((_, idx) => (
              <input
                ref={activeOtpIdx === idx ? inputRef : null}
                type="number"
                value={otp[idx] || ""}
                onChange={handleOtpChange}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                key={idx}
                className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle outline-none rounded dark:focus:border-white focus:border-primary bg-transparent text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
              />
            ))}
          </div>
          <div className="">
            <SubmitButton value="Verify account" />
            <button
              type="button"
              onClick={handleOtpResend}
              className="dark:text-white text-blue-500 font-semibold hover:underline mt-2"
            >
              I don't have OTP
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
