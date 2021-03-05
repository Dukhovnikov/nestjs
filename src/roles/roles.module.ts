import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from '../models/role.schema';
import { PermissionSchema } from '../models/permission';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: 'Permission', schema: PermissionSchema },
    ]),
  ],
})
export class RolesModule {}
