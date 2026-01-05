"use server";

import { auth } from "@/auth";
import RequestButton from "@/components/requestButton";
import SignInButton from "@/components/signInButton";
import SignOutButton from "@/components/signOutButton";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <main>
        <p>Welcome, {session.user.name}</p>
        <SignOutButton />
        <RequestButton />
      </main>
    );
  }

  return (
    <main>
      <p>You are not signed in</p>
      <SignInButton />
    </main>
  );
}
