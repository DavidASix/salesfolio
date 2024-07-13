import reqType from "@/middleware/reqType";
import validateInput from "@/middleware/validateInput";
import clientPromise from "@/utils/database";

export async function POST(request) {
  const { username } = await request.json();
  console.log(username)
  try {
    await reqType(request, "POST");
    await validateInput([
      { name: "username", value: username, type: "string" },
    ]);
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ username: username });
    return new Response(!existingUser);
  } catch (err) {
    // Handle errors
    console.error(err);
    return new Response(JSON.stringify(err), {status: err.code});
  }
}
