import { Error as MongooseError } from "mongoose";
import clientPromise from "@/utils/mongoose-connect";
import Outreach from "@/model/Outreach";

import { auth } from "@/auth";

/*
  This route is authenticated and deletes an outreach item that has _id equal to the string at id
*/

export async function POST(request) {
  const { id } = await request.json();
  try {
    const session = await auth();
    if (!session) {
      throw { code: 403, message: "Could not authenticate" };
    }

    if (!id || typeof id !== "string") {
      throw { message: "Error with information provided", code: 401 };
    }

    console.log('attempting delete')
    await clientPromise;
    await Outreach.findByIdAndDelete(id);

    return new Response(JSON.stringify(true));
  } catch (err) {
    console.log(err);
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
