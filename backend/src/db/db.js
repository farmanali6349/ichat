import { DATBASE_URL } from "../config/config.js";

import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(DATBASE_URL);

console.log("Database initiated successfully");
