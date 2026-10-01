import "dotenv/config";

function require(variable) {
  const envVar = process.env[variable];
  if (!envVar) {
    throw new Error(`Environment Variable ${variable} not configured.`);
  }

  return envVar;
}

export const DATBASE_URL = require("DATABASE_URL");
export const IS_DEV = process.env.NODE_ENV === "development";
