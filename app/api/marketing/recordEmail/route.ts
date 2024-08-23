import { Error as MongooseError } from "mongoose";
import clientPromise from "@/utils/mongoose-connect";
import MarketingEmail from "@/model/MarketingEmail";
import rateLimit from '@/middleware/rateLimit';

export async function POST(request) {
  const { email } = await request.json();
  try {
    await rateLimit(request, 3, '10 m')
    await clientPromise;
    const marketingEmail = new MarketingEmail({email});
    await marketingEmail.save();
    return new Response("Success");
  } catch (err) {
    console.log(err)
    let resErr: {message: string; code: number} = {
        message: err.message || '',
        code: err.code || 500,
    }
    // Handle custom validation errors
    if (err instanceof MongooseError.ValidationError) {
      const errorList = Object.values(
        err.errors
      ) as MongooseError.ValidatorError[];
      resErr.message = errorList[0]?.properties?.message || err.message;
      resErr.code = 400
    }
    if (err?.errorResponse?.code === 11000) {
        resErr.message = "Value already recorded";
        resErr.code = 400
    }
    return new Response(JSON.stringify(resErr), { status: resErr.code || err.code || 400 });
  }
}
