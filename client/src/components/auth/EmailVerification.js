import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const OTP_LENGTH = 6;
let currentOTPIndex;

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIdx, setActiveOtpIdx] = useState(0);

  const inputRef = useRef();

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

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIdx]);

  return (
    <FormContainer>
      <Container>
        <form className={classNames(commonModalClasses)}>
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
          <SubmitButton value="Send Link" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
