import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { users } from "../db/schema";
import {
  CreateUserRequestSchema,
  CreateUserResponseSchema,
  GetUserResponseSchema,
  GetUsersResponseSchema,
} from "./dtos";

export const usersRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.addHook("onRequest", fastify.requireAuth);

  fastify.get(
    "/users",
    {
      schema: {
        response: {
          200: GetUsersResponseSchema,
        },
      },
    },
    async () => {
      const allUsers = await fastify.db.select().from(users);
      return {
        users: allUsers.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
        })),
      };
    },
  );

  fastify.get(
    "/users/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: GetUserResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const user = await fastify.db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      if (user.length === 0 || user[0].id !== request.session?.user.id) {
        return reply.notFound("User not found");
      }

      return { user: user[0] };
    },
  );

  fastify.post(
    "/users",
    {
      schema: {
        body: CreateUserRequestSchema,
        response: {
          201: CreateUserResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, firstName, lastName } = request.body;

      const [newUser] = await fastify.db
        .insert(users)
        .values({
          email,
          name: `${firstName} ${lastName}`,
          firstName,
          lastName,
        })
        .returning();

      return reply.code(201).send({ user: newUser });
    },
  );
};
