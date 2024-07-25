import { auth } from "@/auth";
import FolioComponent from './Folio'

export default async function Folio() {
    const session = await auth()
    return <FolioComponent session={session} />;
  }
  