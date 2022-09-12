import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import FormTitle from "../form/FormTitle";
import SubmitButton from "../form/SubmitButton";

const SignUpForm = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-4">
          <FormTitle>Sign up</FormTitle>
          <FormInput name="name" placeholder="John Doe" label="Name" />
          <FormInput name="email" placeholder="john@email.com" label="Email" />
          <FormInput name="password" placeholder="********" label="Password" />
          <SubmitButton value="Sign up" />

          <div className="flex justify-between">
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Forget password
            </a>
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Sign in
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignUpForm;
