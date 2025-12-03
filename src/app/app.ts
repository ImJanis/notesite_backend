import { join } from "node:path";

import AutoLoad from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import type { FastifyInstance } from "fastify";

import { authRoutes } from "./auth/route";
import { envConfig } from "./config/env";
import { recordsRoutes } from "./records/route";
import { usersRoutes } from "./users/route";

// biome-ignore lint/suspicious: <empty object>
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Env variables setup
  fastify.register(fastifyEnv, envConfig);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: { ...opts },
  });

  fastify.register(usersRoutes);
  fastify.register(authRoutes);
  fastify.register(recordsRoutes);
}
