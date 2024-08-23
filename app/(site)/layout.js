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
  }

  return (
    <div className="bg-dotted flex flex-col w-full">
      <header className="z-40 h-16">
        <NavBar session={session} />
      </header>
      <main
        className={`z-20 row justify-content-center align-items-start relative overflow-x-clip`}
      >
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
