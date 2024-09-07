import { auth } from "@/auth";
import { Error as MongooseError } from "mongoose";
import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongoose-connect";
import Outreach from "@/model/Outreach";
import Profile from "@/model/Profile";

/*
  This route collects all of the users outreaches up to a certain page
  This is done when after the user has added or removed an entry and needs
  to re-sync with the database.
  This route is authenticated as users should not be able to fetch all of the 
  outreaches for another user
*/

export async function POST(request) {
  const { page, pageSize, username } = await request.json();
  try {
    const session = await auth();
    if (!session) {
      throw { code: 403, message: "Could not authenticate" };
    }

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

    if (!profile.userId.equals(new ObjectId(session?.user.id))) {
      throw { code: 403, message: "Could not authenticate 2 " };
    }

    const query = Outreach.find({ userId: profile.userId })
      .select('-userId')
      .sort({ createdAt: -1 })
      .limit(pageSize * page);
    const outreaches = await query;

    return new Response(JSON.stringify(outreaches));
  } catch (err) {
    console.log(err)
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
