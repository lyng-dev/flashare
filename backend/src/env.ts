import * as env from "env-var";

// Read a PORT environment variable and ensure it's a positive integer.
// An EnvVarError will be thrown if the variable is not set, or if it
// is not a positive integer.
export const BUCKET: string = env.get("BUCKET").required().asString();
export const AWS_ACCOUNT_ID: string = env
  .get("AWS_ACCOUNT_ID")
  .required()
  .asString();
export const AWS_REGION: string = env.get("AWS_REGION").required().asString();
export const ENV: string = env.get("ENV").required().asString();
