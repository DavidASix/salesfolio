import { signIn, signOut, auth } from "@/auth";

async function loginLinkedin() {
  "use server";
  await signIn("linkedin", { redirectTo: "/profile" });
}

async function logout() {
  "use server";
  await signOut();
}

export default async function Login() {
  const session = await auth();
  return (
    <>
      <h1>Hello {session?.user?.email || "world"}</h1>
      <form action={loginLinkedin}>
        <button type="submit" className="btn btn-primary">
          Signin with LinkedIn
        </button>
      </form>

      <form action={logout}>
        <button type="submit" className="btn btn-accent">
          Sign Out
        </button>
      </form>
    </>
  );
}
