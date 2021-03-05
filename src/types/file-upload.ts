import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export class FileUpload extends Document {
  id: ObjectId | string;
  name: string;
  alternativeText: string;
  caption?: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: any;
  provider: string;
  related: any[];
  createdAt: Date | string;
  updatedAt: Date | string;
  previewUrl: string;
  provider_metadata: any;
}
