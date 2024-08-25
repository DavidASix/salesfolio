import { auth } from "@/auth";
import clientPromise from "@/utils/mongoose-connect";
import Profile from "@/model/Profile";
import formatServerError from "@/utils/server-error";

export async function POST(request) {
  const { value, key } = await request.json();
  const { user } = await auth();

  try {
    await clientPromise;
    const result = await Profile.updateOne(
      { userId: user.id },
      { [key]: value },
      { runValidators: true },
    );
    
    if (!result.acknowledged) {
      throw {message: 'Could not update value', code: 400};
    }
    if (!result.matchedCount) {
      throw { message: "Profile not found", code: 404 };
    }

    return new Response("true");
  } catch (err) {
    // Handle errors
    const formattedError = formatServerError(err);
    return new Response(JSON.stringify(formattedError), {
      status: formattedError.code,
    });
  }
}
