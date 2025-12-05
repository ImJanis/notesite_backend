import { count, desc, eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { records } from "../db/schema";
import { getSession } from "../plugins/auth";
import { BlobService } from "../services/blob";
import {
  CreateRecordRequestSchema,
  CreateRecordResponseSchema,
  GetPresignedUrlRequestSchema,
  GetPresignedUrlResponseSchema,
  GetRecordParamsSchema,
  GetRecordResponseSchema,
  GetRecordsQuerySchema,
  GetRecordsResponseSchema,
} from "./dtos";

export const recordsRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.addHook("onRequest", fastify.requireAuth);

  fastify.get(
    "/records",
    {
      schema: {
        querystring: GetRecordsQuerySchema,
        response: { 200: GetRecordsResponseSchema },
      },
    },
    async (request) => {
      const userId = getSession(request).user.id;
      const { page, limit } = request.query;
      const offset = (page - 1) * limit;

      const [userRecords, [{ total }]] = await Promise.all([
        fastify.db
          .select()
          .from(records)
          .where(eq(records.userId, userId))
          .orderBy(desc(records.createdAt))
          .limit(limit)
          .offset(offset),
        fastify.db
          .select({ total: count() })
          .from(records)
          .where(eq(records.userId, userId)),
      ]);

      return {
        records: userRecords.map((record) => ({
          id: record.id,
          title: record.title,
          status: record.status,
          durationSeconds: record.durationSeconds,
          createdAt: record.createdAt,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    },
  );

  fastify.get(
    "/records/:id",
    {
      schema: {
        params: GetRecordParamsSchema,
        response: {
          200: GetRecordResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const record = await fastify.db
        .select()
        .from(records)
        .where(eq(records.id, id))
        .limit(1);

      if (
        record.length === 0 ||
        record[0].userId !== getSession(request).user.id
      ) {
        return reply.notFound();
      }

      return {
        record: {
          id: record[0].id,
          title: record[0].title,
          description: record[0].description,
          internalNotes: record[0].notesInternal,
          sourceType: record[0].sourceType,
          status: record[0].status,
          durationSeconds: record[0].durationSeconds,
          createdAt: record[0].createdAt,
        },
      };
    },
  );

  fastify.post(
    "/records",
    {
      schema: {
        body: CreateRecordRequestSchema,
        response: {
          201: CreateRecordResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { title, description, sourceType } = request.body;

      const userId = getSession(request).user.id;

      let computedTitle = title;
      if (!computedTitle) {
        const nbRecords = await fastify.db
          .select({ count: count() })
          .from(records)
          .where(eq(records.userId, userId));

        computedTitle = `Record ${nbRecords[0].count + 1}`;
      }

      const [newRecord] = await fastify.db
        .insert(records)
        .values({
          userId,
          title: computedTitle,
          description,
          sourceType: sourceType || "other",
        })
        .returning();

      return reply.code(201).send({ record: newRecord });
    },
  );

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
