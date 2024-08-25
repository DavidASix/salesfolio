import { redirect } from "next/navigation";
import { auth } from "@/auth";
import axios from "axios";
const { DOMAIN } = process.env;

import SetupComponent from "./Setup";

const Setup = async () => {
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

  if (!profile?.firstLogin) {
    // redirect throws an error internal, must be called outside of try catch
    return redirect("/profile/settings");
  }

  return <SetupComponent profile={profile} />;
};

export default Setup;
