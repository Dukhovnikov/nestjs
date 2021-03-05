import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { UserSchema } from '../src/models/user.schema';
import { DepoSchema } from '../src/models/depo.schema';
import { SignInDto } from '../src/auth/auth.dto';
import { baseUrl, db } from './env-variables';
import * as users from '../utils/users.json';
import * as depos from '../utils/depos.json';
import * as countries from '../utils/countries.json';
import axios from 'axios';
import { HttpStatus } from '@nestjs/common';
import { CountrySchema } from '../src/models/country.schema';
import { CountryDto } from '../src/countries/country.dto';

const userModel = mongoose.model('User', UserSchema);
const depoModel = mongoose.model('Depo', DepoSchema);
const countryModel = mongoose.model('Country', CountrySchema);

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
  await depoModel.deleteMany({});
  await countryModel.deleteMany({});
  await userModel.insertMany(users);
  await depoModel.insertMany(depos);
  await countryModel.insertMany(countries);

  const {
    data: { jwt },
  } = await axios.post(`${baseUrl}/auth/local`, userLogin);
  jwtToken = jwt;
});

afterAll(async () => {
  await userModel.deleteMany({});
  await depoModel.deleteMany({});
  await countryModel.deleteMany({});
  await mongoose.connection.close();
});

describe('UserProfile e2e testing', () => {
  it('should list all countries', function() {
    return request(baseUrl)
      .get('/countries')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0].depos[0]._id).toEqual('5fa78606079c136efbe2361b');
        expect(body[0].users[0]._id).toEqual('5fa8b4cc079c136efbe23665');
      });
  });

  it('should not allow to list countries', function() {
    return request(baseUrl)
      .get('/countries')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should find one country', function() {
    return request(baseUrl)
      .get('/countries/5f9fd6894c9d5478c9fc7b4d')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body.name).toEqual('中国');
        expect(body.countryCode).toEqual('056');
        expect(body.depos[0]._id).toEqual('5fa78606079c136efbe2361b');
        expect(body.users[0]._id).toEqual('5fa8b4cc079c136efbe23665');
      });
  });

  it('should not allow to get country', function() {
    return request(baseUrl)
      .get('/countries/5f9fd6894c9d5478c9fc7b4d')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should return the country count', () => {
    return request(baseUrl)
      .get(`/countries/count`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body.count).toEqual(1);
      })
      .expect(200);
  });

  it('should not allow to get country count', function() {
    return request(baseUrl)
      .get('/countries/count')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should create a country', () => {
    const country: CountryDto = {
      countryCode: '055',
      depos: ['5fa78606079c136efbe2361b'],
      name: 'Brazil',
      users: ['5fa8b4cc079c136efbe23665'],
    };

    return request(baseUrl)
      .post('/countries')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(country)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.countryCode).toEqual(country.countryCode);
        expect(body.name).toEqual(country.name);
        expect(body.depos[0]._id).toEqual(country.depos[0]);
        expect(body.users[0]._id).toEqual(country.users[0]);
      });
  });

  it('should not allow to create country', function() {
    return request(baseUrl)
      .post('/countries')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should update a country', function() {
    const country: CountryDto = {
      countryCode: '007',
      name: 'Russia',
    };

    return request(baseUrl)
      .put('/countries/5f9fd6894c9d5478c9fc7b4d')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(country)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.countryCode).toEqual(country.countryCode);
        expect(body.name).toEqual(country.name);
        expect(body.depos[0]._id).toEqual('5fa78606079c136efbe2361b');
        expect(body.users[0]._id).toEqual('5fa8b4cc079c136efbe23665');
      });
  });

  it('should not allow to update country', function() {
    return request(baseUrl)
      .put('/countries/5f9fd6894c9d5478c9fc7b4d')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should delete the country by its id', async () => {
    return request(baseUrl)
      .del(`/countries/5f667b93fa4e2b0f919a487b`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('should not allow to delete country', function() {
    return request(baseUrl)
      .del('/countries/5f9fd6894c9d5478c9fc7b4d')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
