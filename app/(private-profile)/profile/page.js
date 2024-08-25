import { redirect } from "next/navigation";

/* 
 * /profile is not a page, and will always redirect to settings if
 * the user is authenticated
 */

export default async function Profile() {
  return redirect("/profile/folio");
}
