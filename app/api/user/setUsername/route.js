import { auth } from "@/auth";
import reqType from "@/middleware/reqType";
import validateInput from "@/middleware/validateInput";
import clientPromise from "@/utils/database";

export async function POST(request) {
  const { username } = await request.json();
  const { user } = await auth();
  console.log(user);
  try {
    await reqType(request, "POST");
    await validateInput([
      { name: "username", value: username, type: "string" },
    ]);
    // User tried to set their username to their current username
    if (username === user?.username) {
      return new Response('No change')
    }
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ username: username });
    if (existingUser) {
      throw { code: 401, message: "Username unavailable" };
    }
    await usersCollection.updateOne(
      { uuid: user?.uuid },
      { $set: { username } }
    );

    return new Response("Success");
  } catch (err) {
    // Handle errors
    console.error(err);
    return new Response(JSON.stringify(err), { status: err.code });
  }
}
