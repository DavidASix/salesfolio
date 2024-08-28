import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { auth } from "@/auth";

const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_OI_BUCKET } =
  process.env;

export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      throw { code: 403, message: "Could not authenticate" };
    }

    // Parse form data to extract the file
    const form = await request.formData();
    const file = form.get("image");

    const tenMb = 10 * 1024 * 1024;
    if (!file) {
      throw { code: 401, message: "No file uploaded" };
    }
    if (file.size > tenMb) {
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
      Bucket: AWS_OI_BUCKET,
      Key: `${Date.now()}_${file.name}`, // to ensure unique file names
      Body,
      ContentType: file.type,
    };

    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log(`File uploaded successfully: ${params.Key}`);
    const url = `https://s3.${AWS_REGION}.amazonaws.com/${AWS_OI_BUCKET}/${params.Key}`;

    return new Response(JSON.stringify(url));
  } catch (err) {
    // Handle errors
    console.error(err);
    return new Response(JSON.stringify(err), { status: err.code || 500 });
  }
}
