import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface Config {
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_ENDPOINT: string;
  R2_BUCKET: string;
}

export class BlobService {
  constructor(private readonly config: Config) {}

  async getPresignedUrl(
    key: string,
    contentType: string,
    expiresIn: number = 60,
  ) {
    const S3 = new S3Client({
      region: "auto",
      endpoint: this.config.R2_ENDPOINT,
      credentials: {
        accessKeyId: this.config.R2_ACCESS_KEY_ID,
        secretAccessKey: this.config.R2_SECRET_ACCESS_KEY,
      },
    });

    const putUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: this.config.R2_BUCKET,
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn },
    );

    return putUrl;
  }
}
