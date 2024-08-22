import { auth } from "@/auth";
import { Error as MongooseError } from "mongoose";
import clientPromise from "@/utils/mongoose-connect";
import Outreach from "@/model/Outreach";
import Profile from "@/model/Profile";

/*
  This route is used to retrieve the current users outreaches
  This is done seperately from retireiving other users as it will return the 
*/

export async function POST(request) {
  const { page, pageSize, username } = await request.json();
  try {
    if (
      typeof page !== "number" ||
      typeof pageSize !== "number" ||
      !pageSize ||
      typeof username !== "string"
    ) {
      throw { message: "Error with information provided", code: 401 };
    }

    await clientPromise;
    let profile = await Profile.findOne({username});
    if (!profile) {
      throw { message: "Error with information provided", code: 401 };
    }

    const query = Outreach.find({ userId: profile.userId })
      .select('-userId')
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const outreaches = await query;

    return new Response(JSON.stringify(outreaches));
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
