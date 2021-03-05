import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { FileDto } from '../upload/file.dto';
import { ContainerDto } from '../containers/container.dto';
import { DeposDto } from '../depos/depos.dto';
import { ProfileDto } from '../userprofile/userprofile.dto';

export interface ActionModel extends Document {
  createdAt?: Date | string;
  updatedAt?: Date | string;
  shortDoor?: FileDto | ObjectId | string;
  longRight?: FileDto | ObjectId | string;
  shortWithoutDoor?: FileDto | ObjectId | string;
  longLeft?: FileDto | ObjectId | string;
  roof?: FileDto | ObjectId | string;
  hasDamage?: boolean;
  hasScratches?: boolean;
  hasHoles?: boolean;
  hasRust?: boolean;
  type?: string;
  container?: ContainerDto | ObjectId | string;
  step?: number;
  depo?: DeposDto | ObjectId | string;
  finished?: boolean;
  inRepair?: boolean;
  userprofile?: ProfileDto | ObjectId | string;
  defects: FileDto[] | ObjectId[] | string[];
}

export interface Action {
  _id: ObjectId | string;
  shortDoor: UploadFile;
  longRight: UploadFile;
  shortWithoutDoor: UploadFile;
  longLeft: UploadFile;
  roof: UploadFile;
  hasDamage: boolean;
  hasScratches: boolean;
  hasHoles: boolean;
  hasRust: boolean;
  defects: ObjectId[] | string[];
  type: string;
  container: ObjectId | string;
  step: string;
  depo: ObjectId[] | string[];
  finished: boolean;
  inRepair: boolean;
  userprofile: ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface UploadFile {
  id: ObjectId | string;
  _id: ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: JSON;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata: JSON;
  related: string;
}
