import { Module } from '@nestjs/common';
import { UserprofileController } from './userprofile.controller';
import { UserprofileService } from './userprofile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from '../models/user-profile.schema';

@Module({
  controllers: [UserprofileController],
  providers: [UserprofileService],
  imports: [
    MongooseModule.forFeature([
      { name: 'UserProfile', schema: UserProfileSchema },
    ]),
  ],
})
export class UserprofileModule {}
