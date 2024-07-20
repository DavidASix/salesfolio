import { signOut, auth } from "@/auth";

async function logout() {
  "use server";
  await signOut();
}

export default async function Settings() {
    const session = await auth()
    return (
      <>
        <h1>Hello {session?.user?.email || "world"}</h1>
        <h2>Settings Page</h2>
        <form action={logout}>
        <button type="submit" className="btn btn-accent">
          Sign Out
        </button>
      </form>
      </>
    );
  }
  