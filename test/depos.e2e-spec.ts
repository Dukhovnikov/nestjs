import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as depos from '../utils/depos.json';
import * as actions from '../utils/actions.json';
import * as profiles from '../utils/user-profile.json';
import * as containers from '../utils/containers.json';
import { DepoSchema } from '../src/models/depo.schema';
import { baseUrl, db } from './env-variables';
import { HttpStatus } from '@nestjs/common';
import { ActionSchema } from '../src/models/action.schema';
import { UserProfileSchema } from '../src/models/user-profile.schema';
import { ContainerSchema } from '../src/models/container.schema';
import { DeposDto } from '../src/depos/depos.dto';

const depoModel = mongoose.model('Depo', DepoSchema);
const actionModel = mongoose.model('Action', ActionSchema);
const profileModel = mongoose.model('UserProfile', UserProfileSchema);
const containerModel = mongoose.model('Container', ContainerSchema);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

beforeAll(async () => {
  jest.setTimeout(100000);
  await depoModel.deleteMany({});
  await actionModel.deleteMany({});
  await profileModel.deleteMany({});
  await containerModel.deleteMany({});
  await depoModel.insertMany(depos);
  await actionModel.insertMany(actions);
  await profileModel.insertMany(profiles);
  await containerModel.insertMany(containers);
});

afterAll(async () => {
  await depoModel.deleteMany({});
  await actionModel.deleteMany({});
  await profileModel.deleteMany({});
  await containerModel.deleteMany({});
  await mongoose.connection.close();
});

describe('Depos e2e testing', () => {
  const depo: DeposDto = {
    title: 'test depo',
    address: 'test depo address',
    depoNo: 'test depo NO',
    phone: '89217514622',
    email: 'test@gmail.com',
    actions: ['5f511938e6a98f7b424edd59'],
    userprofiles: ['5f667b93fa4e2b0f919a487b'],
    containers: ['5f67a2bcf87c134b1cdfbcbf'],
  };

  let depoId: string;

  it('Should list all depos', () => {
    return request(baseUrl)
      .get('/depos')
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
      })
      .expect(200);
  });

  it('Should create the depo', () => {
    return request(baseUrl)
      .post('/depos')
      .send(depo)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        depoId = body._id;
        expect(body.title).toEqual(depo.title);
        expect(body.address).toEqual(depo.address);
        expect(body.depoNo).toEqual(depo.depoNo);
        expect(body.phone).toEqual(depo.phone);
        expect(body.email).toEqual(depo.email);
        expect(body.actions[0]._id).toEqual(depo.actions[0]);
        expect(body.userprofiles[0]._id).toEqual(depo.userprofiles[0]);
        expect(body.containers[0]._id).toEqual(depo.containers[0]);
      })
      .expect(HttpStatus.CREATED);
  });

  it('Should find one depo by its id', () => {
    return request(baseUrl)
      .get(`/depos/${depoId}`)
      .expect(({ body }) => {
        expect(body.title).toEqual(depo.title);
        expect(body.address).toEqual(depo.address);
        expect(body.depoNo).toEqual(depo.depoNo);
        expect(body.phone).toEqual(depo.phone);
        expect(body.email).toEqual(depo.email);
        expect(body.actions[0]._id).toEqual(depo.actions[0]);
        expect(body.userprofiles[0]._id).toEqual(depo.userprofiles[0]);
        expect(body.containers[0]._id).toEqual(depo.containers[0]);
      })
      .expect(200);
  });

  it('Should return the depos count', () => {
    return request(baseUrl)
      .get('/depos/count')
      .expect(({ body }) => {
        expect(body.count).toEqual(2);
      })
      .expect(200);
  });

  it('Should update the depo by its id', () => {
    return request(baseUrl)
      .put(`/depos/${depoId}`)
      .send({ address: 'new depo adress' })
      .expect(({ body }) => {
        expect(body.title).toEqual(depo.title);
        expect(body.address).toEqual('new depo adress');
        expect(body.depoNo).toEqual(depo.depoNo);
        expect(body.phone).toEqual(depo.phone);
        expect(body.email).toEqual(depo.email);
        expect(body.actions[0]._id).toEqual(depo.actions[0]);
        expect(body.userprofiles[0]._id).toEqual(depo.userprofiles[0]);
        expect(body.containers[0]._id).toEqual(depo.containers[0]);
      });
  });

  it('Should delete the depo', () => {
    return request(baseUrl)
      .del(`/depos/${depoId}`)
      .expect(200);
  });
});
