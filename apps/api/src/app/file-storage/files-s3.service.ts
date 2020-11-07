import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3BucketAbstract } from './s3-bucket.abstract';

@Injectable()
export class FilesS3Service extends S3BucketAbstract {
  bucketName = 'AWS_FILES_BUCKET_NAME';

  constructor(readonly configService: ConfigService) {
    super(configService);
  }
}
