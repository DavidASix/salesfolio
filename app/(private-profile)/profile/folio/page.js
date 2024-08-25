import { auth } from "@/auth";
import { redirect } from 'next/navigation'
import FolioComponent from './Folio'
import axios from 'axios';
const {DOMAIN} = process.env;

export default async function Folio() {
    try {
      const session = await auth()
      const {data} = await axios.post(`${DOMAIN}/api/user/getProfile`, {userId: session.user.id});
      return <FolioComponent session={session} profile={data} />;
    } catch (err) {
      console.log(err)
      return redirect('/');
    }
  }
  