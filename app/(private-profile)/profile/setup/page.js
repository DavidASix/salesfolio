import { redirect } from 'next/navigation'
import { auth } from "@/auth";

import SetupComponent from './Setup';

const Setup = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user?.firstLogin) {
    return redirect('/profile/settings');
  }

  return <SetupComponent user={user} />;
}

export default Setup;