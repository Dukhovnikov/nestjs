import { DepoSchema } from '../src/models/depo.schema';

require('dotenv').config();

import * as containers from '../utils/containers.json';
import * as users from '../utils/users.json';
import * as files from '../utils/files.json';
import * as profiles from '../utils/user-profile.json';
import * as actions from '../utils/actions.json';
import * as depos from '../utils/depos.json';
import * as countries from '../utils/countries.json';
import * as roles from '../utils/roles.json';
import * as permissions from '../utils/permissions.json';
import * as mongoose from 'mongoose';
import { Container } from '../src/types/container';
import { ContainerSchema } from '../src/models/container.schema';
import { UserSchema } from '../src/models/user.schema';
import { FileSchema } from '../src/models/file.schema';
import { UserProfileSchema } from '../src/models/user-profile.schema';
import { ActionSchema } from '../src/models/action.schema';
import { CountrySchema } from '../src/models/country.schema';
import { RoleSchema } from '../src/models/role.schema';
import { PermissionSchema } from '../src/models/permission';

const seed = async () => {
  try {
    console.log('[seed] : running...');

    await mongoose.connect(process.env.MONGO_URL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const containerModel = mongoose.model('Container', ContainerSchema);
    const userModel = mongoose.model('User', UserSchema);
    const fileModel = mongoose.model('File', FileSchema);
    const userProfile = mongoose.model('UserProfile', UserProfileSchema);
    const actionModel = mongoose.model('Action', ActionSchema);
    const depoModel = mongoose.model('Depo', DepoSchema);
    const countryModel = mongoose.model('Country', CountrySchema);
    const roleModel = mongoose.model('Role', RoleSchema);
    const permissionModel = mongoose.model('Permission', PermissionSchema);

    await containerModel.insertMany(containers);
    await userModel.insertMany(users);
    await fileModel.insertMany(files);
    await userProfile.insertMany(profiles);
    await actionModel.insertMany(actions);
    await depoModel.insertMany(depos);
    await countryModel.insertMany(countries);
    await roleModel.insertMany(roles);
    await permissionModel.insertMany(permissions);

    console.log('[seed] : success');
  } catch (e) {
    throw new Error(`failed to seed database. Error: ${e.message}`);
  } finally {
    await mongoose.connection.close();
  }
};

seed();
