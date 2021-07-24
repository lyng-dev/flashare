import * as AWS from "aws-sdk";
import { BUCKET } from "../../env";
import { IBurnedSecretResult, IRequestedSecretResult } from "../../types";
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
  // const notifyEmail = requestedObject.Body.secret.notifyEmail;
  // delete requestedObject.Body.secret.notifyEmail;

  return {
    statusCode: 200,
    secret: requestedObject.Body.toString("utf-8"),
    //notifyEmail: notifyEmail,
    keyName: id,
  };
}

export const consumeSecret = async (event: any, context: any) => {
  const requestedSecretResult = await readS3SecretObject(
    event.pathParameters.id
  );
  //const notifyEmail = requestedSecretResult.notifyEmail;
  await burnS3SecretObject(requestedSecretResult.keyName);
  //if (!!notifyEmail) console.log('Would have sent mail to, ', notifyEmail);

  return {
    statusCode: requestedSecretResult.statusCode,
    headers: corsHeaders,
    body: JSON.stringify({
      keyName: requestedSecretResult.keyName,
      secret: requestedSecretResult.secret,
    }),
  };
};
