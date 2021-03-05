import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as users from '../utils/users.json';
import { baseUrl, db } from './env-variables';
import { UserSchema } from '../src/models/user.schema';
import { SignInDto } from '../src/auth/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { UserDto } from '../src/shared/user.dto';
import axios from 'axios';
import { UserProfileSchema } from '../src/models/user-profile.schema';
import * as profiles from '../utils/user-profile.json';
import { RoleSchema } from '../src/models/role.schema';
import * as roles from '../utils/roles.json';

const userModel = mongoose.model('User', UserSchema);
const profileModel = mongoose.model('UserProfile', UserProfileSchema);
const roleModel = mongoose.model('Role', RoleSchema);

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
  await profileModel.deleteMany({});
  await roleModel.deleteMany({});
  await userModel.insertMany(users);
  await profileModel.insertMany(profiles);
  await roleModel.insertMany(roles);

  const {
    data: { jwt },
  } = await axios.post(`${baseUrl}/auth/local`, userLogin);
  jwtToken = jwt;
});

afterAll(async () => {
  await profileModel.deleteMany({});
  await userModel.deleteMany({});
  await roleModel.deleteMany({});
  await mongoose.connection.close();
});

describe('User e2e testing', () => {
  const userLogin: SignInDto = {
    email: 'help@incodewetrust.dev',
    password: 'password',
  };

  const user: UserDto = {
    confirmed: false,
    blocked: false,
    _id: '5f5dbd880a43ee0c6a1f14a1',
    email: 'thedarkyland1@gmail.com',
    password: '$2b$10$H1NANhnC0FPzlrRna.NNlu6vX1kJ24SvQxhdYkl4juimXuDCZRCk2',
    username: 'ingwaazdesign@mail.ru',
    provider: 'local',
    createdAt: '2020-09-13T06:34:48.468Z',
    updatedAt: '2020-09-18T15:02:20.657Z',
    role: {
      _id: '5f50883a623f6c74ea1aaf69',
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2020-09-03T06:07:54.673Z',
      updatedAt: '2020-10-15T15:21:22.182Z',
      id: '5f50883a623f6c74ea1aaf69',
    },
  };

  it('should authenticate user', () => {
    return request(baseUrl)
      .post('/auth/local')
      .set('Accept', 'application/json')
      .send(userLogin)
      .expect(({ body }) => {
        expect(body.jwt).toBeDefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should list all users', () => {
    return request(baseUrl)
      .get('/users')
      .expect(({ body }) => {
        expect(body.length).toEqual(8);
      })
      .expect(HttpStatus.OK);
  });

  it('should return the logged user', () => {
    return request(baseUrl)
      .get('/users/me')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body._id).toEqual('5f51126ee6a98f7b424edd51');
        expect(body.confirmed).toBeTruthy();
        expect(body.blocked).toBeFalsy();
        expect(body.username).toEqual('manager');
        expect(body.email).toEqual('help@incodewetrust.dev');
        expect(body.provider).toEqual('local');
        expect(body.role).toEqual('5f5865ef0a43ee0c6a1f135a');
        expect(body.password).toBeUndefined();
      })
      .expect(HttpStatus.OK);
  });

  it('should throw error if user is not authenticated /users/me', () => {
    return request(baseUrl)
      .get('/users/me')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body.code).toEqual(401);
        expect(body.message).toEqual('Unauthorized');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should return a single user info', () => {
    return request(baseUrl)
      .get('/users/5f6808bbf87c134b1cdfbd35')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body._id).toEqual('5f6808bbf87c134b1cdfbd35');
        expect(body.confirmed).toBeTruthy();
        expect(body.blocked).toBeFalsy();
        expect(body.username).toEqual('TestSuperAdmin');
        expect(body.email).toEqual('ingwaazdesign@mail.ru');
        expect(body.provider).toEqual('local');
        expect(body.userprofile.nickName).toEqual('Danil Dukhovnikov');
        expect(body.role._id).toEqual('5f68083ff87c134b1cdfbccb');
        expect(body.role.name).toEqual('SuperAdmin');
        expect(body.password).toBeUndefined();
      })
      .expect(HttpStatus.OK);
  });

  it('should throw error if user is not authenticated /users/{id}', () => {
    return request(baseUrl)
      .get('/users/5f680aeef87c134b1cdfbd9f')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body.code).toEqual(401);
        expect(body.message).toEqual('Unauthorized');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should throw error if user is not found', () => {
    return request(baseUrl)
      .get('/users/5f680980f87c134b1cdfbd30')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body.code).toEqual(404);
        expect(body.message).toEqual('User not found');
      })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should update an user', () => {
    user.username = 'dummy updated';
    user.confirmed = true;

    return request(baseUrl)
      .put(`/users/${user._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(user)
      .expect(({ body }) => {
        expect(body._id).toEqual(user._id);
        expect(body.password).toBeUndefined();
        expect(body.confirmed).toBeTruthy();
        expect(body.blocked).toBeFalsy();
        expect(body.provider).toEqual('local');
        expect(body.username).toEqual('dummy updated');
        expect(body.email).toEqual('thedarkyland1@gmail.com');
      })
      .expect(HttpStatus.OK);
  });

  it('should throw error if user is not authenticated to update user', () => {
    return request(baseUrl)
      .put('/users/5f680aeef87c134b1cdfbd9f')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body.code).toEqual(401);
        expect(body.message).toEqual('Unauthorized');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should delete the user by id', () => {
    return request(baseUrl)
      .del(`/users/${user._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK);
  });

  it('should throw error if user is not authenticated to execute a delete', () => {
    return request(baseUrl)
      .del('/users/5f680aeef87c134b1cdfbd9f')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body.code).toEqual(401);
        expect(body.message).toEqual('Unauthorized');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
