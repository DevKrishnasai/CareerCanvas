import { PrismaClient } from "@careeraft/database";

export const db = new PrismaClient({
  log: ["error", "warn"],
});
