import * as mongoose from 'mongoose';
import * as request from 'supertest';
import * as profiles from '../utils/user-profile.json';
import * as actions from '../utils/actions.json';
import * as depos from '../utils/depos.json';
import { UserProfileSchema } from '../src/models/user-profile.schema';
import { db, baseUrl } from './env-variables';
import { HttpStatus } from '@nestjs/common';
import { SignInDto } from '../src/auth/auth.dto';
import axios from 'axios';
import { CreateProfileDto } from '../src/userprofile/userprofile.dto';
import * as users from '../utils/users.json';
import { UserSchema } from '../src/models/user.schema';
import { ActionSchema } from '../src/models/action.schema';
import { DepoSchema } from '../src/models/depo.schema';

const profileModel = mongoose.model('UserProfile', UserProfileSchema);
const userModel = mongoose.model('User', UserSchema);
const actionModel = mongoose.model('Action', ActionSchema);
const depoModel = mongoose.model('Depo', DepoSchema);

const userLogin: SignInDto = {
  email: 'help@incodewetrust.dev',
  password: 'password',
};

let jwtToken: string;

beforeAll(async () => {
  jest.setTimeout(100000);
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await userModel.deleteMany({});
  await profileModel.deleteMany({});
  await actionModel.deleteMany({});
  await depoModel.deleteMany({});
  await userModel.insertMany(users);
  await profileModel.insertMany(profiles);
  await actionModel.insertMany(actions);
  await depoModel.insertMany(depos);

  const {
    data: { jwt },
  } = await axios.post(`${baseUrl}/auth/local`, userLogin);
  jwtToken = jwt;
});

afterAll(async () => {
  await profileModel.deleteMany({});
  await userModel.deleteMany({});
  await actionModel.deleteMany({});
  await depoModel.deleteMany({});
  await mongoose.connection.close();
});

describe('UserProfile e2e testing', () => {
  const profile: CreateProfileDto = {
    actions: ['5f7c0367d33a5159b5b98c34'],
    avatarUrl:
      'https://thirdwx.qlogo.cn/mmhead/Tk3LoOX6v7NenkuopQnqtUtWFZvTOAH9rhUGsXIT5ibE/132',
    nickName: '尤莉娅',
    user: '5f7a5626d33a5159b5b98be5',
  };
  let profileId: string;

  it('should list all profiles', () => {
    return request(baseUrl)
      .get('/userprofiles')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body.length).toEqual(2);
        expect(body[0].nickName).toEqual('AndreyTest');
        expect(body[1].nickName).toEqual('Danil Dukhovnikov');
        expect(body[1].user.username).toEqual('TestSuperAdmin');
        expect(body[1].user.email).toEqual('ingwaazdesign@mail.ru');
        expect(body[0].actions.length).toEqual(1);
        expect(body[0].actions[0]._id).toEqual('5f511938e6a98f7b424edd59');
        expect(body[1].actions.length).toEqual(2);
        expect(body[1].actions[0]._id).toEqual('5f67a2bcf87c134b1cdfbcc0');
        expect(body[1].actions[1]._id).toEqual('5f73213fd33a5159b5b987f3');
        expect(body[0].depo).toBeNull();
        expect(body[1].depo.title).toEqual('Test Depo');
      });
  });

  it('should not allow unauthorized access', () => {
    return request(baseUrl)
      .get('/userprofiles')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should create a profile', () => {
    return request(baseUrl)
      .post('/userprofiles')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(profile)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        profileId = body._id;
        expect(body.actions).toEqual(profile.actions);
        expect(body.avatarUrl).toEqual(profile.avatarUrl);
        expect(body.nickName).toEqual(profile.nickName);
        expect(body.user).toEqual(profile.user);
      })
      .expect(HttpStatus.CREATED);
  });

  it('should not allow unauthorized create profile', () => {
    return request(baseUrl)
      .post('/userprofiles')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should find one profile', () => {
    return request(baseUrl)
      .get('/userprofiles/5f667b93fa4e2b0f919a487b')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body.nickName).toEqual('Danil Dukhovnikov');
        expect(body.user.username).toEqual('TestSuperAdmin');
        expect(body.user.email).toEqual('ingwaazdesign@mail.ru');
        expect(body.actions.length).toEqual(2);
        expect(body.actions[0]._id).toEqual('5f67a2bcf87c134b1cdfbcc0');
        expect(body.actions[1]._id).toEqual('5f73213fd33a5159b5b987f3');
        expect(body.depo.title).toEqual('Test Depo');
      });
  });

  it('should not allow unauthorized access to get a profile', () => {
    return request(baseUrl)
      .get('/userprofiles/5f667b93fa4e2b0f919a487b')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should count how many profiles', () => {
    return request(baseUrl)
      .get('/userprofiles/count')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body.count).toEqual(3);
      });
  });

  it('should not allow unauthorized access to count profiles', () => {
    return request(baseUrl)
      .get('/userprofiles/count')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should update the profile by its id', () => {
    const actions = ['5f7c0367d33a5159b5b98c34', '5f73213fd33a5159b5b987f3'];
    return request(baseUrl)
      .put(`/userprofiles/5f667b93fa4e2b0f919a487b`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ actions, user: '5f6808bbf87c134b1cdfbd35', nickName: 'Danil' })
      .expect(({ body }) => {
        expect(body.avatarUrl).toEqual(
          'https://thirdwx.qlogo.cn/mmopen/vi_32/94x6ZZP22ia7TXlUBTCkTricAOQpbv1HYg8JbAibRZQ5PBa6Kpak9qGXV8LA47GPZxfQKZjOqRXKZuq4mibMK6Qj6w/132',
        );
        expect(body.nickName).toEqual('Danil');
        expect(body.user).toEqual('5f6808bbf87c134b1cdfbd35');
        expect(body.actions).toEqual(actions);
      })
      .expect(200);
  });

  it('should not allow unauthorized access to update profiles', () => {
    const actions = ['5f7c0367d33a5159b5b98c34', '5f73213fd33a5159b5b987f3'];
    return request(baseUrl)
      .put('/userprofiles/5f667b93fa4e2b0f919a487b')
      .send({ actions, user: '5f6808bbf87c134b1cdfbd35' })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should delete the profile by its id', async () => {
    return request(baseUrl)
      .del(`/userprofiles/5f667b93fa4e2b0f919a487b`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('should not allow unauthorized access to delete a profile', () => {
    return request(baseUrl)
      .del('/userprofiles/5f667b93fa4e2b0f919a487b')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
