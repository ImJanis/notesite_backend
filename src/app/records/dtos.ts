import { z } from "zod";

export const GetRecordsResponseSchema = z.object({
  records: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      status: z.string(),
      durationSeconds: z.number(),
      createdAt: z.date(),
    }),
  ),
});

export const GetRecordParamsSchema = z.object({
  id: z.string(),
});

export const GetRecordResponseSchema = z.object({
  record: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    internalNotes: z.string().nullable(),
    sourceType: z.string(),
    status: z.string(),
    durationSeconds: z.number(),
    createdAt: z.date(),
  }),
});

export const CreateRecordRequestSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  sourceType: z.string().nullable(),
});

export const CreateRecordResponseSchema = z.object({
  record: z.object({
    id: z.string(),
    title: z.string(),
  }),
});

export const GetPresignedUrlRequestSchema = z.object({
  recordingId: z.string(),
  index: z.number(),
  contentType: z.string(),
  fileExtension: z.string(),
});

export const GetPresignedUrlResponseSchema = z.object({
  presignedUrl: z.string(),
});
