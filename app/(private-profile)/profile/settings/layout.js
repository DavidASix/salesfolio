import { redirect } from 'next/navigation'
import { auth } from "@/auth";

/* 
 * If this is the users first login they are forced through the setup
 * Setup finalizes with removal of the "firstLogin" flag from their profile
 */
export default async function RootLayout({ children }) {
  const session = await auth();

  if (session?.user?.firstLogin) {
    console.log('first login')
    return redirect('/profile/setup');
  }

  return children
}
