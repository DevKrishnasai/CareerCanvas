import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex h-screen w-full justify-center items-center flex-col">
      <h2>Landing page</h2>
      <p>
        {session?.user ? `Hello ${session.user.name}` : "You are not logged in"}
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
