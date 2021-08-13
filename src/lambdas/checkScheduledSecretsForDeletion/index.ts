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
  const scheduledDelete: IScheduledDelete = JSON.parse(event.Records[0].body);
  const parsedSecretToDelete = scheduledDelete.keyName;
  const parsedExpirationDate = Date.parse(scheduledDelete.expirationDate);
  const now = Date.now();
  const isExpired = parsedExpirationDate < now;
  if (isExpired) {
    console.log(`Secret ${parsedSecretToDelete} has expired. Deleting.`);
    await burnS3SecretObject(parsedSecretToDelete);
    return;
  }
  throw new Error(
    `Secret '${parsedSecretToDelete}' will expire at: ${scheduledDelete.expirationDate}'`
  );
}
