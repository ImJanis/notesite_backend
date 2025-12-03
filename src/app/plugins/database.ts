import { drizzle } from "drizzle-orm/node-postgres";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("db", db);

  fastify.log.info("Database connection established");

  fastify.addHook("onClose", async () => {
    fastify.log.info("Closing database connection");
  });
};

export default fp(databasePlugin, {
  name: "database",
  dependencies: ["@fastify/env"],
});
