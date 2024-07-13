import { auth } from "@/auth";
import reqType from "@/middleware/reqType";
import validateInput from "@/middleware/validateInput";
import clientPromise from "@/utils/database";

const approvedValues = require('./approvedValues.json');

export async function POST(request) {
  const { value, key } = await request.json();
  const { user } = await auth();
  console.log(user);
  try {
    await reqType(request, "POST");
    await validateInput([
      { name: key, value: value, type: "string" },
    ]);
    
    if (!approvedValues.includes(key)) {
        throw {code: 403, message: `${key} is not an approved value`}
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");
    
    await usersCollection.updateOne(
      { uuid: user?.uuid },
      { $set: { key: value } }
    );

    return new Response("Success");
  } catch (err) {
    // Handle errors
    console.error(err);
    return new Response(JSON.stringify(err), { status: err.code });
  }
}
