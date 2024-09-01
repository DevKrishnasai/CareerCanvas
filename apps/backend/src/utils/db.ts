import { PrismaClient } from "@career-canvas/database";

export const db = new PrismaClient({
  log: ["query", "info", "warn"],
});
