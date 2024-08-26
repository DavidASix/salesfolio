import { auth } from "@/auth";
import SettingsComponent from "./Settings";
import axios from "axios";
const { DOMAIN } = process.env;
import { redirect } from "next/navigation";

/*
 * If this is the users first login they are forced through the setup
 * Setup finalizes with removal of the "firstLogin" flag from their profile
 */

export default async function Settings() {
  let session;
  let profile;

  try {
    session = await auth();
    const { data } = await axios.post(`${DOMAIN}/api/user/getProfile`, {
      userId: session.user.id,
    });
    profile = data;
  } catch (err) {
    return redirect("/");
  }

  if (profile?.firstLogin) {
    // redirect throws an error internal, must be called outside of try catch
    return redirect("/profile/setup");
  }

  let user = {
    email: session?.user?.email,
  };
  return <SettingsComponent user={user} profile={profile} />;
}
