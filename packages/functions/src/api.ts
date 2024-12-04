import { Resource } from "sst";
import { Handler } from "aws-lambda";
import { Example } from "@monorepo-template/core/example";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export const handler: Handler = async (_event) => {

  const s3 = new S3Client();

  const data = {
    date: new Date()
  }

  await s3.send(new PutObjectCommand({
    Key: "sanple.json",
    Body: JSON.stringify(data),
    Bucket: Resource.MyBucket.name, // SST が自動注入
    ContentType: "application/json"
  }));

  return {
    statusCode: 200,
    body: `${Example.hello()} Linked to ${Resource.MyBucket.name}.`,
  };
};
