import { redirect } from 'next/navigation'

import { auth } from "@/auth";
import NavBar from "@/components/Navigation";
import Footer from "@/components/Footer";

/* 
 * Redirect unauthed users to the login page.
 */

export default async function RootLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/login');
  }

  if (session?.user) {
    session.user = session.user;
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-16 bg-base-100">
        <NavBar session={session} />
      </header>
      <main
        className={`z-20 row justify-content-center align-items-start relative`}
      >
        {children}
      </main>
    </>
  );
}
