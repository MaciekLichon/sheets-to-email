"use server";

import { auth } from "@/auth";
import Main from "@/components/Main";

export default async function Home() {
  const session = await auth();

  return (
    <main className="h-dvh p-6 pt-3">
      <Main session={session} />
    </main>
  );
}
