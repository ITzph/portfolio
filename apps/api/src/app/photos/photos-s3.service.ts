import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3BucketAbstract } from '../file-storage/s3-bucket.abstract';

@Injectable()
export class PhotosS3Service extends S3BucketAbstract {
  bucketName = 'AWS_PHOTOS_BUCKET_NAME';

  constructor(readonly configService: ConfigService) {
    super(configService);
  }
}
