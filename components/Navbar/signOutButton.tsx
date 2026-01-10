"use client";

import { logout } from "@/lib/actions/auth";

const SignOutButton = () => {
  return (
    <button className="button-primary" onClick={() => logout()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
