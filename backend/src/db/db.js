import { DATBASE_URL } from "../config/config.js";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { relations } from "./schema.js";
const pool = new Pool({
  connectionString: DATBASE_URL,
});

export const db = drizzle({ client: pool, relations: relations });

console.log("Database initiated successfully");
