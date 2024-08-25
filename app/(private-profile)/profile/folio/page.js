'use server'
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
import FolioComponent from './Folio'
import axios from 'axios';
const {DOMAIN} = process.env;

export default async function Folio() {
  let session;
  let profile;
    try {
      session = await auth()
      const {data} = await axios.post(`${DOMAIN}/api/user/getProfile`, {userId: session.user.id});
      profile = data;
    } catch (err) {
      return redirect('/');
    }

    if (profile?.firstLogin) {
      // redirect throws an error internal, must be called outside of try catch
      return redirect('/profile/setup');
    }

    return <FolioComponent profile={profile} />;
  }
  