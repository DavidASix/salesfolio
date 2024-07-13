import { redirect } from 'next/navigation'
import { auth } from "@/auth";

/* 
 * If this is not the users first login they cannot view the setup page
 */
export default async function RootLayout({ children }) {
  const session = await auth();

  if (!session?.user?.firstLogin) {
    return redirect('/profile/settings');
  }

  return children
}
