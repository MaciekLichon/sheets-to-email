"use client";

import { logout } from "@/lib/actions/auth";

const SignOutButton = () => {
  return (
    <button className="border p-2 rounded-md" onClick={() => logout()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
