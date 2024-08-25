import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { auth } from "@/auth";
import clientPromise from "@/utils/database";

const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_PP_BUCKET } = process.env;

export async function POST(request) {
  const { user } = await auth();
  // Parse form data to extract the file
  const form = await request.formData();
  const file = form.get("image");
  
  const twoMb = 2 * 1024 * 1024;
  if (!file) {
    throw { code: 401, message: "No file uploaded" };
  }
  if (file.size > twoMb) {
    throw { code: 401, message: "File too large" };
  }

  const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  const Body = await file.arrayBuffer();
  const params = {
    Bucket: AWS_PP_BUCKET,
    Key: `${Date.now()}_${file.name}`, // to ensure unique file names
    Body,
    ContentType: file.type,
  };

  try {
    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log(`File uploaded successfully: ${params.Key}`);
    const url = `https://${AWS_PP_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${params.Key}`;

    // Save URL to DB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    await usersCollection.updateOne(
      { uuid: user?.uuid },
      { $set: { image: url } }
    );

    return new Response("Success");
  } catch (err) {
    // Handle errors
    console.error(err);
    return new Response(JSON.stringify(err), { status: err.code });
  }
}
