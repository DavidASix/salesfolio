import { NextRequest } from "next/server";

import clientPromise from "@/utils/mongoose-connect";
import Outreach from "@/model/Outreach";
import Profile from "@/model/Profile";
import formatServerError from "@/utils/server-error";

/*
  This route is used to retrieve the current users outreach count
  This is done seperately from retireiving other users as it will return the 
*/

export async function POST(request:NextRequest) {
  const { username } = await request.json();
  try {
    if (typeof username !== "string") {
      throw { message: "Error with information provided", code: 401 };
    }

    await clientPromise;
    let profile = await Profile.findOne({ username });
    if (!profile) {
      throw { message: "Error with information provided", code: 401 };
    }

    const count = await Outreach.countDocuments({ userId: profile.userId });

    return new Response(JSON.stringify(count));
  } catch (err) {
    const formattedError = formatServerError(err);
    return new Response(JSON.stringify(formattedError), {
      status: formattedError.code,
    });
  }
}
