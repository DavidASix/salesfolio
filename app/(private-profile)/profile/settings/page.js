import { auth } from "@/auth";
import SettingsComponent from './Settings'


export default async function Settings() {
    const session = await auth()
    return <SettingsComponent session={session} />;
  }
  