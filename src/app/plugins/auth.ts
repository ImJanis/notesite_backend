import { fromNodeHeaders } from "better-auth/node";
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { auth } from "../lib/auth";

type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export function getSession(request: FastifyRequest): Session {
  if (!request.session) {
    throw new Error(
      "requireAuth hook must be applied before accessing session",
    );
  }
  return request.session;
}

const authPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate(
    "requireAuth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
      });

      if (!session?.user) {
        return reply.unauthorized();
      }

      request.session = session;
    },
  );
};

export default fp(authPlugin, { name: "auth-plugin" });
