import { SQSEvent } from "aws-lambda/trigger/sqs";
import * as AWS from "aws-sdk";
import { BUCKET } from "../../env";
import { IBurnedSecretResult, IScheduledDelete } from "../../types";

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

export async function checkScheduledSecretsForDeletion(event: SQSEvent) {
  console.log(`Received: `, event);
  const scheduledDelete: IScheduledDelete = JSON.parse(event.Records[0].body);
  console.log(`Parsed body as: `, scheduledDelete);
  const parsedSecretToDelete = scheduledDelete.keyName;
  const parsedExpirationDate = Date.parse(scheduledDelete.expirationDate);

  console.log(`Parsed date to: `, parsedExpirationDate);

  const now = Date.now();
  const isExpired = parsedExpirationDate < now;
  console.log(`isExpired: `, isExpired);

  if (isExpired) {
    console.log(`Secret '${parsedSecretToDelete}' has expired. Deleting.`);
    await burnS3SecretObject(parsedSecretToDelete);
    return;
  }
  console.log(
    `Secret '${parsedSecretToDelete}' will expire at: ${parsedExpirationDate}'`
  );
  throw new Error(
    `Secret '${parsedSecretToDelete}' will expire at: ${parsedExpirationDate}'`
  );
}
