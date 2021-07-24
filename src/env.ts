import * as env from "env-var";

// Read a PORT environment variable and ensure it's a positive integer.
// An EnvVarError will be thrown if the variable is not set, or if it
// is not a positive integer.
export const BUCKET: string = env.get("BUCKET").required().asString();
