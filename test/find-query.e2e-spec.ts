import * as request from 'supertest';
import * as containers from '../utils/containers.json';
import * as mongoose from 'mongoose';
import { ContainerSchema } from '../src/models/container.schema';
import { baseUrl, db } from './env-variables';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
const model = mongoose.model('Container', ContainerSchema);

beforeAll(async () => {
  jest.setTimeout(100000);
  await model.deleteMany({});
  await model.insertMany(containers);
});

afterAll(async () => {
  await model.deleteMany({});
  await mongoose.connection.close();
});

describe('Containers e2e testing - query', () => {
  it('should return one container', () => {
    return request(baseUrl)
      .get(`/containers`)
      .query({ _limit: 1 })
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
      })
      .expect(200);
  });

  it('should sort the list by containerNo', () => {
    return request(baseUrl)
      .get(`/containers`)
      .query({ _sort: 'containerNo' })
      .expect(({ body }) => {
        expect(body[0].containerNo).toEqual('AABB1234567');
      })
      .expect(200);
  });

  it('should skip the first container', () => {
    return request(baseUrl)
      .get(`/containers`)
      .query({ _start: 1 })
      .expect(({ body }) => {
        expect(body[0].containerNo).toEqual('ABCD1234567');
      })
      .expect(200);
  });

  it('should return containers that are: = ', () => {
    return request(baseUrl)
      .get(`/containers`)
      .query({ containerNo: 'v' })
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0].containerNo).toEqual('v');
      })
      .expect(200);
  });

  it('should return containers that are: _ne ', () => {
    return request(baseUrl)
      .get(`/containers`)
      .query({ containerNo_ne: 'AABB1234567' })
      .expect(({ body }) => {
        expect(body.length).toEqual(2);
      })
      .expect(200);
  });

  it('should return containers that are: _lt ', () => {
    const dt = new Date('2020-09-20T05:08:22.668Z');
    return request(baseUrl)
      .get(`/containers`)
      .query({ createdAt_lt: dt })
      .expect(({ body }) => {
        expect(body.length).toEqual(4);
        expect(body[0].containerNo).toEqual('ABCD1234567');
      })
      .expect(200);
  });

  it('should return containers that are: _lte ', () => {
    const dt = new Date('2020-09-20T05:08:22.668Z');
    return request(baseUrl)
      .get(`/containers`)
      .query({ createdAt_lte: dt })
      .expect(({ body }) => {
        expect(body.length).toEqual(5);
        expect(body[0].containerNo).toEqual('ABCD1234567');
        expect(body[1].containerNo).toEqual('AABB1234567');
      })
      .expect(200);
  });

  it('should return containers that are: _gt ', () => {
    const dt = new Date('2020-09-20T05:08:22.668Z');
    return request(baseUrl)
      .get(`/containers`)
      .query({ createdAt_gt: dt })
      .expect(({ body }) => {
        expect(body.length).toEqual(3);
        expect(body[0].containerNo).toEqual('v');
        expect(body[1].containerNo).toEqual('AABB1234567');
      })
      .expect(200);
  });

  it('should return containers that are: _gte ', () => {
    const dt = new Date('2020-09-20T05:08:22.668Z');
    return request(baseUrl)
      .get(`/containers`)
      .query({ createdAt_gte: dt })
      .expect(({ body }) => {
        expect(body.length).toEqual(4);
        expect(body[0].containerNo).toEqual('v');
        expect(body[1].containerNo).toEqual('AABB1234567');
        expect(body[2].containerNo).toEqual('AABB1234567');
        expect(body[3].containerNo).toEqual('AABB1234567');
      })
      .expect(200);
  });

  it('should return containers that are: _contains ', () => {
    return request(baseUrl)
      .get(`/containers`)
      .query({ containerNo_contains: 'AABB1234567' })
      .expect(({ body }) => {
        expect(body.length).toEqual(6);
        expect(body[0].containerNo).toEqual('AABB1234567');
        expect(body[1].containerNo).toEqual('AABB1234567');
      })
      .expect(200);
  });

  it('should return containers that are: _containss ', () => {
    return request(baseUrl)
      .get(`/containers`)
      .query({ containerNo_containss: 'AABB1234567' })
      .expect(({ body }) => {
        expect(body.length).toEqual(6);
        expect(body[0].containerNo).toEqual('AABB1234567');
      })
      .expect(200);
  });

  it('should return containers that are: _in ', () => {
    return request(baseUrl)
      .get(`/containers?containerNo_in=AABB1234567&containerNo_in=v`)
      .expect(({ body }) => {
        expect(body.length).toEqual(7);
        expect(body[0].containerNo).toEqual('v');
        expect(body[6].containerNo).toEqual('AABB1234567');
      })
      .expect(200);
  });

  it('should return containers that are: _nin ', () => {
    return request(baseUrl)
      .get(`/containers?containerNo_nin=AABB1234567&containerNo_nin=v`)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0].containerNo).toEqual('ABCD1234567');
      })
      .expect(200);
  });
});
