import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "~/env";
import * as schema from "./schema";

const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: env.NODE_ENV === "production",
  },
  schema,
});

export { db, schema };
