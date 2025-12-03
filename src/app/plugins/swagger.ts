import fastifySwagger from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
  if (fastify.config.NODE_ENV === "production") {
    return;
  }

  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "NoteSite API",
        description: "NoteSite API documentation",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  fastify.register(scalarApiReference, {
    routePrefix: "/reference",
    configuration: {
      authentication: {
        securitySchemes: {
          httpBearer: {
            token: "xyz token value",
          },
        },
      },
    },
  });

  fastify.get("/documentation/json", async () => {
    return fastify.swagger();
  });
};

export default fp(swaggerPlugin, {
  name: "swagger",
  dependencies: ["@fastify/env"], // mandatory dependency on env plugin
});
