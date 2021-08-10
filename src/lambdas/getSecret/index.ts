import * as AWS from "aws-sdk";
import { corsHeaders } from "../../corsHeaders";
import { BUCKET } from "../../env";
import { IRequestedSecretResult } from "../../types";

const s3 = new AWS.S3();

async function readS3SecretObject(id: string): Promise<IRequestedSecretResult> {
  let requestedObject: any;
  try {
    requestedObject = await s3
      .getObject({
        Bucket: BUCKET,
        Key: id,
      })
      .promise();
  } catch (err) {
    throw err;
  }

  return {
    statusCode: 200,
    secret: requestedObject.Body.toString("utf-8"),
    keyName: id,
  };
}

export const getSecret = async (event: any, _context: any) => {
  const readSecretObjectResult = await readS3SecretObject(
    event.queryStringParameters.id
  );

  return {
    statusCode: readSecretObjectResult.statusCode,
    headers: corsHeaders,
    body: JSON.stringify({ keyName: readSecretObjectResult.keyName }),
  };
};
