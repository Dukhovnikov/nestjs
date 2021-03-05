import * as sharp from 'sharp';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { FileUpload } from '../types/file-upload';
import { CountDto } from '../shared/count.dto';
import { FileDto, FileUploadDto } from './file.dto';

@Injectable()
export class UploadService {
  constructor(@InjectModel('File') private fileModel: Model<FileUpload>) {}

  async filesCount(): Promise<CountDto> {
    const count = await this.fileModel.countDocuments();
    return { count };
  }

  async findAllFiles(): Promise<FileDto[]> {
    return this.fileModel.find();
  }

  async findOneFile(id: string): Promise<FileDto> {
    return this.fileModel.findById(id);
  }

  async deleteFile(id: string): Promise<void> {
    await this.fileModel.findByIdAndDelete(id);
  }

  async saveFileInfo(file: FileUploadDto): Promise<FileDto> {
    const { filename, size, mimetype: mime, path: url, originalname } = file;
    const name = path.parse(originalname).name.replace(/\s/g, '');
    const hash = path.parse(filename).name.replace(/\s/g, '');
    const ext = path.parse(filename).ext;

    const extraInfo = await this.imageInfo(url);

    const newFile = new this.fileModel({
      name,
      hash,
      mime,
      size,
      ext,
      ...extraInfo,
    });
    await newFile.save();

    return newFile;
  }

  async imageInfo(
    imageUri,
  ): Promise<{ width: number; height: number; url: string }> {
    const imagePath = path.join(__dirname, '..', '..', '..', imageUri);
    const { width, height } = await sharp(imagePath).metadata();
    return {
      width,
      height,
      url: `/${imageUri}`,
    };
  }
}
