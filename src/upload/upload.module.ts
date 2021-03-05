import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { FileSchema } from '../models/file.schema';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';

const storage = diskStorage({
  destination: process.env.STORAGE,
  filename: (req, file, cb) => {
    const filename: string = path
      .parse(file.originalname)
      .name.replace(/\s/g, '');
    const extension: string = path.parse(file.originalname).ext;
    const hash = crypto.randomBytes(5).toString('hex');
    cb(null, `${filename}_${hash}${extension}`);
  },
});

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    MulterModule.register({
      dest: process.env.STORAGE,
      storage,
    }),
  ],
})
export class UploadModule {}
