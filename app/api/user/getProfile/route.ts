import { auth } from "@/auth";
import { Error as MongooseError } from "mongoose";
import clientPromise from "@/utils/mongoose-connect";
import Profile from "@/model/Profile";

/*
  This route is used to retrieve the current users profile
  This is done seperately from retireiving other users as it will return the 
  User ID
*/

export async function POST(request) {
  const { userId } = await request.json();
  try {
    if (!userId) {
      throw { message: "Error with information provided", code: 401 };
    }

    await clientPromise;
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      throw { message: "Error with information provided", code: 401 };
    }

    return new Response(JSON.stringify(profile));
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
