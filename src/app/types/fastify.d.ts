import "fastify";

import type { drizzle } from "drizzle-orm/node-postgres";

import type { auth } from "../lib/auth";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      NODE_ENV: string;
      PORT: number;
      LOGGING_LEVEL: string;
      DATABASE_URL: string;
      R2_ACCESS_KEY_ID: string;
      R2_SECRET_ACCESS_KEY: string;
      R2_ENDPOINT: string;
      R2_BUCKET: string;
    };
    db: ReturnType<typeof drizzle>;
    requireAuth: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }

  interface FastifyRequest {
    session: Awaited<ReturnType<typeof auth.api.getSession>> | null;
  }

  interface FastifyBaseLogger {
    custom: FastifyLogFn;
  }
}
