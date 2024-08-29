import { auth } from "@/auth";
import { Error as MongooseError } from "mongoose";
import clientPromise from "@/utils/mongoose-connect";
import Outreach from "@/model/Outreach";

export async function POST(request) {
  const {
    type,
    title,
    description,
    emailSubject,
    emailBody,
    imageUrl,
    audioFileUrl,
  } = await request.json();
  try {
    const session = await auth();
    if (!session) {
      throw { code: 403, message: "Could not authenticate" };
    }
    await clientPromise;
    const outreach = new Outreach({
      userId: session.user.id,
      type,
      title,
      description,
      emailSubject,
      emailBody,
      imageUrl,
      audioFileUrl,
    });
    const inputtedOutreach = await outreach.save();
    return new Response(JSON.stringify(inputtedOutreach));
  } catch (err) {
    let message: string = err.message;
    if (err instanceof MongooseError.ValidationError) {
      const errorList = Object.values(
        err.errors
      ) as MongooseError.ValidatorError[];
      message = errorList[0]?.properties?.message || err.message;
    }
    return new Response(JSON.stringify(message), { status: err.code || 400 });
  }
}
