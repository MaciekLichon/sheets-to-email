"use client";

import { login } from "@/lib/actions/auth";

const SignInButton = () => {
  return (
    <button className="button-primary" onClick={() => login()}>
      Sign In With Google
    </button>
  );
};

export default SignInButton;
