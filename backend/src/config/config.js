import "dotenv/config";

function require(variable) {
  const envVar = process.env[variable];
  if (!envVar) {
    throw new Error(`Environment Variable ${variable} not configured.`);
  }

  return envVar;
}

export const DATBASE_URL = require("DATABASE_URL");
export const PORT = require("PORT");

export const CLERK_PUBLISHABLE_KEY = require("CLERK_PUBLISHABLE_KEY");
export const CLERK_SECRET_KEY = require("CLERK_SECRET_KEY");
export const IMAGE_KIT_PRIVATE_KEY = require("IMAGE_KIT_PRIVATE_KEY");
export const IS_DEV = process.env.NODE_ENV === "development";
export const FRONTEND_URL = process.env.FRONTEND_URL;
