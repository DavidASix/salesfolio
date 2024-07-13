import { auth } from "@/auth";

export default async function Settings() {
    const session = await auth()
    return (
      <>
        <h1>Hello {session?.user?.email || "world"}</h1>
        <h2>Settings Page</h2>
      </>
    );
  }
  