import { auth } from "@/auth";

import NavBar from "@/components/Navigation";
import Footer from "@/components/Footer";

export default async function RootLayout({ children }) {
  const session = await auth();
  if (session?.user) {
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
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
