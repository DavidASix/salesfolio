import { redirect } from 'next/navigation'

import { auth } from "@/auth";
import NavBar from "@/components/NavigationPrivate";


export default async function RootLayout({ children }) {
  const session = await auth();
  
  // Redirect unauthed users to the login page.
  if (!session?.user) {
    return redirect('/login');
  }

  if (session?.user) {
    // TODO: Remove any unwanted data that goes to client side.
    session.user = session.user;
  };

  return (
    <div className="bg-dotted-accent flex flex-col w-full">
      <header className="z-40 h-16">
        <NavBar session={session} />
      </header>
      <main
        className={`z-20 row justify-content-center align-items-start relative overflow-x-clip`}
      >
        {children}
      </main>
    </div>
  );
}
