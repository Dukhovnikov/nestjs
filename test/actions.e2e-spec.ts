import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { ActionDto } from 'src/actions/action.dto';
import * as depos from '../utils/depos.json';
import * as actions from '../utils/actions.json';
import * as profiles from '../utils/user-profile.json';
import * as containers from '../utils/containers.json';
import { DepoSchema } from '../src/models/depo.schema';
import { ActionSchema } from '../src/models/action.schema';
import { UserProfileSchema } from '../src/models/user-profile.schema';
import { ContainerSchema } from '../src/models/container.schema';
import { baseUrl, db } from './env-variables';

const actionModel = mongoose.model('Action', ActionSchema);
const depoModel = mongoose.model('Depo', DepoSchema);
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

describe('Actions e2e testing', () => {
  const action: ActionDto = {
    hasDamage: true,
    hasScratches: true,
    hasHoles: true,
    hasRust: true,
    type: 'receive',
    container: '5f658cbbf1d0d826c5fedf1d',
    step: 2,
    depo: '5fa78606079c136efbe2361b',
    finished: true,
    inRepair: true,
    userprofile: '5f658b02f1d0d826c5fedf1c',
  };

  it('should list all actions', () => {
    return request(baseUrl)
      .get('/actions')
      .expect(({ body }) => {
        expect(body.length).toEqual(3);
      })
      .expect(200);
  });

  it('should return the actions count', () => {
    return request(baseUrl)
      .get('/actions/count')
      .expect(({ body }) => {
        expect(body.count).toEqual(3);
      })
      .expect(200);
  });

  it('should create the action', () => {
    return request(baseUrl)
      .post('/actions')
      .send(action)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.hasDamage).toEqual(action.hasDamage);
        expect(body.hasScratches).toEqual(action.hasScratches);
        expect(body.hasHoles).toEqual(action.hasHoles);
        expect(body.hasRust).toEqual(action.hasRust);
        expect(body.type).toEqual(action.type);
        expect(body.container.containerNo).toEqual('ABCD1234567');
        expect(body.step).toEqual(action.step);
        expect(body.depo._id).toEqual('5fa78606079c136efbe2361b');
        expect(body.finished).toEqual(action.finished);
        expect(body.inRepair).toEqual(action.inRepair);
        expect(body.userprofile._id).toEqual('5f658b02f1d0d826c5fedf1c');
      })
      .expect(HttpStatus.CREATED);
  });

  it('should find one action by its id', () => {
    return request(baseUrl)
      .get(`/actions/5f67a2bcf87c134b1cdfbcc0`)
      .expect(({ body }) => {
        expect(body.hasDamage).toBeFalsy();
        expect(body.hasScratches).toBeFalsy();
        expect(body.hasHoles).toBeFalsy();
        expect(body.hasRust).toBeFalsy();
        expect(body.type).toEqual('send');
        expect(body.container._id).toEqual('5f67a2bcf87c134b1cdfbcbf');
        expect(body.step).toEqual(4);
        expect(body.depo).toBeNull();
        expect(body.finished).toBeTruthy();
        expect(body.inRepair).toBeFalsy();
        expect(body.userprofile._id).toEqual('5f667b93fa4e2b0f919a487b');
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
      })
      .expect(200);
  });

  it('should update the container by its id', () => {
    return request(baseUrl)
      .put(`/actions/5f67a2bcf87c134b1cdfbcc0`)
      .send({
        step: 5,
      })
      .expect(({ body }) => {
        expect(body.step).toEqual(5);
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
      })
      .expect(200);
  });

  it('should delete the container', () => {
    return request(baseUrl)
      .del(`/actions/5f67a2bcf87c134b1cdfbcc0`)
      .expect(200);
  });
});
