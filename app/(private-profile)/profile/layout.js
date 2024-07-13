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
      <div className="bg-transparent w-full h-16 absolute top-0" />
      <header className="sticky top-0 z-50 h-20">
        <NavBar session={session} />
      </header>
      <main
        className={`z-20 row pt-2 md:pt-10 m-0 justify-content-center align-items-start`}
      >
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
