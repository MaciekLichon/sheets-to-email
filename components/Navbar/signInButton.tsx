"use client";

import { login } from "@/lib/actions/auth";

const SignInButton = () => {
  return <button onClick={() => login()}>Sign In With Google</button>;
};

export default SignInButton;
