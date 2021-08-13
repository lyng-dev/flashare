import * as AWS from "aws-sdk";
import { SendMessageRequest } from "aws-sdk/clients/sqs";
import { corsHeaders } from "../../corsHeaders";
import { BUCKET, AWS_ACCOUNT_ID, AWS_REGION, ENV } from "../../env";
import {
  ICreatedSecretResult,
  ICreateSecretEnvelope,
  ISecretContent,
} from "../../types";

const s3 = new AWS.S3();

function randIdOfLength(minL: number, maxL: number) {
  let output = "",
    dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  [...Array(Math.floor(Math.random() * maxL + minL)).keys()].forEach(() => {
    output += dict.charAt(Math.floor(Math.random() * dict.length));
  });
  return output;
}

async function scheduleSecretDeletion(
  keyName: string,
  expirationDate: Date
): Promise<void> {
  const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  var params: SendMessageRequest = {
    DelaySeconds: 0,
    MessageBody: JSON.stringify({
      keyName: keyName,
      expirationDate: expirationDate.toISOString(),
    }),
    QueueUrl: `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT_ID}/flashare-${ENV}-sqs-queue-delete-secrets`,
  };

  await sqs.sendMessage(params).promise();
  return;
}

async function createS3SecretObject(
  secret: ISecretContent,
  expiration: Date
): Promise<ICreatedSecretResult> {
  let fileName = `${randIdOfLength(10, 12)}`;

  try {
    await s3
      .putObject({
        Bucket: BUCKET,
        Key: fileName,
        Body: JSON.stringify(secret),
        ContentType: "text/plain",
        Metadata: {
          ExpirationTime: expiration.toISOString(),
        },
      })
      .promise();
  } catch (err) {
    throw err;
  }

  return {
    statusCode: 200,
    keyName: fileName,
  };
}

function currentDatePlusMinutes(minutes: number): Date {
  let currentDate = new Date();
  return new Date(currentDate.getTime() + minutes * 60000);
}

export const createSecret = async (event: any, _context: any) => {
  const envelope: ICreateSecretEnvelope = JSON.parse(event.body);
  const content: ISecretContent = envelope.Content;

  //protect against extending expiration
  const expirationMinutes: number =
    envelope.Expiration > 10080 ? 10080 : envelope.Expiration;

  //verify length of input
  const maximumLength = 100000;
  if (content.secret.length > maximumLength) {
    return {
      statusCode: 413,
    };
  }

  //create secret object
  const expirationDate = currentDatePlusMinutes(expirationMinutes);
  const createdSecretObjectResult = await createS3SecretObject(
    content,
    expirationDate
  );
  const scheduledSecretDeletionResult = await scheduleSecretDeletion(
    createdSecretObjectResult.keyName,
    expirationDate
  );

  //return result
  return {
    statusCode: createdSecretObjectResult.statusCode,
    headers: corsHeaders,
    body: JSON.stringify({ keyName: createdSecretObjectResult.keyName }),
  };
};
