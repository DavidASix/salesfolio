import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { POST as setValue } from "@/app/api/user/setValue/route";
import formatServerError from "@/utils/server-error";

const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_PP_BUCKET } =
  process.env;

export async function POST(request) {
  try {
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

    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const url = `https://s3.${AWS_REGION}.amazonaws.com/${AWS_PP_BUCKET}/${params.Key}`;

    // Pass the request off the setValue endpoint to add image to the profile object
    return await setValue({
      ...request,
      json: async () => ({ key: "image", value: url }),
    });

  } catch (err) {
    // Handle errors
    const formattedError = formatServerError(err)
    return new Response(JSON.stringify(formattedError), { status: formattedError.code });
  }
}
