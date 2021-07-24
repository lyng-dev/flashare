import * as AWS from "aws-sdk";
import { BUCKET } from "../../env";
import { IBurnedSecretResult } from "../../types";
import { corsHeaders } from "../../corsHeaders";

const s3 = new AWS.S3();

async function burnS3SecretObject(id: string): Promise<IBurnedSecretResult> {
  try {
    await s3
      .deleteObject({
        Bucket: BUCKET,
        Key: id,
      })
      .promise();
  } catch (err) {
    throw err;
  }

  return {
    statusCode: 200,
    keyName: id,
  };
}

export const burnSecret = async (event: any, _context: any) => {
  const burnSecretObjectResult = await burnS3SecretObject(
    event.pathParameters.id
  );

  return {
    statusCode: burnSecretObjectResult.statusCode,
    headers: corsHeaders,
    body: JSON.stringify({ keyName: burnSecretObjectResult.keyName }),
  };
};
