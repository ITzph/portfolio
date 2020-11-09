import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as MulterS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

export abstract class S3BucketAbstract implements MulterOptionsFactory {
  private s3: any;
  private readonly FILE_LIMIT_SIZE = 123451232132;
  abstract bucketName: string;

  constructor(protected readonly configService: ConfigService) {
    const isDevEnv = process.env.S3_ENV === 'local';

    this.s3 = new AWS.S3({
      endpoint: isDevEnv ? 'http://localhost:4566' : undefined,
      s3ForcePathStyle: isDevEnv,
      region: 'ap-southeast-1',
    });

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
  }

  public s3Instance(): AWS.S3 {
    return this.s3;
  }

  createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
    const bucket = this.configService.get(this.bucketName);
    const acl = 'public-read';

    const multerS3Storage = MulterS3({
      s3: this.s3,
      bucket,
      acl,
      key: function (req, file, cb) {
        const key = req?.body?.key;

        const s3Key = key ? key : uuid();
        req.file = s3Key;
        cb(null, s3Key);
      },
    });

    return {
      storage: multerS3Storage,
      limits: {
        fileSize: this.FILE_LIMIT_SIZE,
      },
    };
  }
}
