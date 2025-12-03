import { z } from "zod";

export const GetPresignedUrlRequestSchema = z.object({
  recordingId: z.string(),
  index: z.number(),
  contentType: z.string(),
  fileExtension: z.string(),
});

export const GetPresignedUrlResponseSchema = z.object({
  presignedUrl: z.string(),
});
