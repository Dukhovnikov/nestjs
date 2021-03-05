import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as users from '../utils/users.json';
import * as roles from '../utils/roles.json';
import * as permissions from '../utils/permissions.json';
import { baseUrl, db } from './env-variables';
import { UserSchema } from '../src/models/user.schema';
import { SignInDto } from '../src/auth/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { RoleSchema } from '../src/models/role.schema';
import axios from 'axios';
import { CreateRolesDto, UpdateRolesDto } from '../src/roles/roles.dto';
import { PermissionSchema } from '../src/models/permission';

const userModel = mongoose.model('User', UserSchema);
const roleModel = mongoose.model('Role', RoleSchema);
const permissionModel = mongoose.model('Permission', PermissionSchema);

const userLogin: SignInDto = {
  email: 'help@incodewetrust.dev',
  password: 'password',
};

let jwtToken: string;

beforeAll(async () => {
  jest.setTimeout(10000);
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await userModel.deleteMany({});
  await roleModel.deleteMany({});
  await permissionModel.deleteMany({});
  await userModel.insertMany(users);
  await roleModel.insertMany(roles);
  await permissionModel.insertMany(permissions);

  const {
    data: { jwt },
  } = await axios.post(`${baseUrl}/auth/local`, userLogin);
  jwtToken = jwt;
});

afterAll(async () => {
  await userModel.deleteMany({});
  await roleModel.deleteMany({});
  await permissionModel.deleteMany({});
  await mongoose.connection.close();
});

describe('Role e2e testing', () => {
  it('should list all roles', () => {
    return request(baseUrl)
      .get('/users-permissions/roles')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body.length).toEqual(7);
        expect(body[0].users[0]._id).toEqual('5f51126ee6a98f7b424edd51');
        expect(body[0].permissions[0]._id).toEqual('5fb1eb1fe553b04dc4ebd08a');
      });
  });

  it('should not allow unauthorized access to list roles', () => {
    return request(baseUrl)
      .get('/users-permissions/roles')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should get a single role by its id', () => {
    return request(baseUrl)
      .get('/users-permissions/roles/5f680b9ff87c134b1cdfbda1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body.name).toEqual('AdminCity');
        expect(body.type).toEqual('admincity');
        expect(body.users[0]._id).toEqual('5f51126ee6a98f7b424edd51');
        expect(body.users[0].username).toEqual('manager');
        expect(body.permissions[0]._id).toEqual('5fb1eb1fe553b04dc4ebd08a');
      });
  });

  it('should not allow unauthorized access to get role by id', () => {
    return request(baseUrl)
      .get('/users-permissions/roles/5f680b9ff87c134b1cdfbda1')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should create a role', () => {
    const role: CreateRolesDto = {
      name: 'UserProfileTest',
      description: 'test description',
      type: 'userprofiletest',
      permissions: ['5fb1eb1fe553b04dc4ebd08c'],
      users: ['5f7ffd1ed33a5159b5b98dfd'],
    };

    return request(baseUrl)
      .post('/users-permissions/roles')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(role)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.name).toEqual(role.name);
        expect(body.description).toEqual(role.description);
        expect(body.type).toEqual(role.type);
        expect(body.users[0].username).toEqual('testRoles');
        expect(body.permissions[0]._id).toEqual('5fb1eb1fe553b04dc4ebd08c');
      });
  });

  it('should not allow unauthorized create role', () => {
    return request(baseUrl)
      .post('/users-permissions/roles')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should update a role', () => {
    const role: UpdateRolesDto = {
      name: 'AdminCity_updated',
      type: 'userprofiletest',
      permissions: ['5fb1eb1fe553b04dc4ebd08a', '5fb1eb1fe553b04dc4ebd08c'],
      users: ['5f51126ee6a98f7b424edd51', '5f7ffd1ed33a5159b5b98dfd'],
    };

    return request(baseUrl)
      .put('/users-permissions/roles/5f680b9ff87c134b1cdfbda1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(role)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.name).toEqual(role.name);
        expect(body.type).toEqual(role.type);
        expect(body.users[0]._id).toEqual('5f51126ee6a98f7b424edd51');
        expect(body.permissions[0]._id).toEqual('5fb1eb1fe553b04dc4ebd08a');
      });
  });

  it('should not allow unauthorized update role', () => {
    return request(baseUrl)
      .put('/users-permissions/roles/5f680b9ff87c134b1cdfbda1')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should delete the role by its id', async () => {
    return request(baseUrl)
      .del(`/users-permissions/roles/5f680b9ff87c134b1cdfbda1`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('should not allow unauthorized access to delete a role', () => {
    return request(baseUrl)
      .del('/users-permissions/roles/5f680b9ff87c134b1cdfbda1')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
