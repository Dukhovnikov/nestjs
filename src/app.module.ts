import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContainersModule } from './containers/containers.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { UserprofileModule } from './userprofile/userprofile.module';
import { ActionsModule } from './actions/actions.module';
import { DeposModule } from './depos/depos.module';
import { CountriesModule } from './countries/countries.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ContainersModule,
    SharedModule,
    AuthModule,
    UploadModule,
    UserprofileModule,
    ActionsModule,
    DeposModule,
    CountriesModule,
    RolesModule,
  ],
})
export class AppModule {}
