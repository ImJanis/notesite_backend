import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { BlobService } from "../services/blob";
import {
  GetPresignedUrlRequestSchema,
  GetPresignedUrlResponseSchema,
} from "./dtos";

export const recordsRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.addHook("onRequest", fastify.requireAuth);

  fastify.post(
    "/records/presigned-url",
    {
      schema: {
        body: GetPresignedUrlRequestSchema,
        response: {
          200: GetPresignedUrlResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { recordingId, index, contentType, fileExtension } = request.body;

      const blobService = new BlobService(fastify.config);

      const putUrl = await blobService.getPresignedUrl(
        `${recordingId}/${index}.${fileExtension}`,
        contentType,
      );

      return reply.code(200).send({ presignedUrl: putUrl });
    },
  );
};
