import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as containers from '../utils/containers.json';
import { HttpStatus } from '@nestjs/common';
import { baseUrl, db } from './env-variables';
import { ContainerSchema } from '../src/models/container.schema';
import { ActionSchema } from '../src/models/action.schema';
import * as actions from '../utils/actions.json';
import { ContainerDto } from '../src/containers/container.dto';

const containerModel = mongoose.model('Container', ContainerSchema);
const actionModel = mongoose.model('Action', ActionSchema);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

beforeAll(async () => {
  jest.setTimeout(100000);
  await containerModel.deleteMany({});
  await actionModel.deleteMany({});
  await actionModel.insertMany(actions);
  await containerModel.insertMany(containers);
});

afterAll(async () => {
  await containerModel.deleteMany({});
  await actionModel.deleteMany({});
  await mongoose.connection.close();
});

describe('Containers e2e testing', () => {
  let containerId: string;

  it('should list all containers', () => {
    return request(baseUrl)
      .get('/containers')
      .expect(({ body }) => {
        expect(body.length).toEqual(8);
      })
      .expect(200);
  });

  it('should return the container count', () => {
    return request(baseUrl)
      .get(`/containers/count`)
      .expect(({ body }) => {
        expect(body.count).toEqual(8);
      })
      .expect(200);
  });

  it('should create the container', () => {
    const container: ContainerDto = {
      containerNo: 'container number',
      actions: ['5f511938e6a98f7b424edd59'],
    };
    return request(baseUrl)
      .post('/containers')
      .send(container)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        containerId = body._id;
        expect(body.containerNo).toEqual(container.containerNo);
        expect(body.actions).toEqual(container.actions);
      })
      .expect(HttpStatus.CREATED);
  });

  it('should find one container by its id', () => {
    return request(baseUrl)
      .get(`/containers/5f67a2bcf87c134b1cdfbcbf`)
      .expect(({ body }) => {
        expect(body.containerNo).toEqual('v');
        expect(body.actions[0]._id).toEqual('5f67a2bcf87c134b1cdfbcc0');
        expect(body.actions[0].step).toEqual(4);
        expect(body.status).toBeNull();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
      })
      .expect(200);
  });

  it('should find one container by its name', () => {
    return request(baseUrl)
      .get(`/containers/check/ABCD1234567`)
      .expect(({ body }) => {
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.containerNo).toEqual('ABCD1234567');
        expect(body.actions[0]._id).toEqual('5f73213fd33a5159b5b987f3');
        expect(body.actions[1]._id).toEqual('5f511938e6a98f7b424edd59');
      })
      .expect(200);
  });

  it('should update the container by its id', () => {
    return request(baseUrl)
      .put(`/containers/5f67a2bcf87c134b1cdfbcbf`)
      .send({
        actions: ['5f67a2bcf87c134b1cdfbcc0', '5f511938e6a98f7b424edd59'],
        status: 'sentToRepair',
      })
      .expect(({ body }) => {
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.containerNo).toEqual('v');
        expect(body.actions[0]._id).toEqual('5f67a2bcf87c134b1cdfbcc0');
        expect(body.actions[1]._id).toEqual('5f511938e6a98f7b424edd59');
        expect(body.status).toEqual('sentToRepair');
      })
      .expect(200);
  });

  it('should delete the container', async () => {
    return request(baseUrl)
      .del(`/containers/5f66e3c7fa4e2b0f919a489a`)
      .expect(200);
  });
});
