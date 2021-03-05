import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as users from '../utils/users.json';
import { baseUrl, db } from './env-variables';
import { UserSchema } from '../src/models/user.schema';
import { SignInDto, SignUpDto } from '../src/auth/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { UserDto } from '../src/shared/user.dto';

const authModel = mongoose.model('User', UserSchema);

beforeAll(async () => {
  jest.setTimeout(10000);
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await authModel.deleteMany({});
  await authModel.insertMany(users);
});

afterAll(async () => {
  await authModel.deleteMany({});
  await mongoose.connection.close();
});

describe('Auth e2e testing', () => {
  const userLogin: SignInDto = {
    email: 'help@incodewetrust.dev',
    password: 'password',
  };

  const newUser: SignUpDto = {
    username: 'dummy',
    email: 'dummy@test.dev',
    password: 'password',
  };

  it('should authenticate user', () => {
    return request(baseUrl)
      .post('/auth/local')
      .set('Accept', 'application/json')
      .send(userLogin)
      .expect(({ body }) => {
        expect(body.jwt).toBeDefined();
        expect(body.user._id).toEqual('5f51126ee6a98f7b424edd51');
        expect(body.user.confirmed).toBeTruthy();
        expect(body.user.blocked).toBeFalsy();
        expect(body.user.username).toEqual('manager');
        expect(body.user.provider).toEqual('local');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should throw error for incorrect credentials', () => {
    return request(baseUrl)
      .post('/auth/local')
      .set('Accept', 'application/json')
      .send({ email: 'someone@test.dev', password: 'password' })
      .expect(({ body }) => {
        expect(body.code).toEqual(401);
        expect(body.message).toEqual('Invalid credentials');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should register an new user', () => {
    return request(baseUrl)
      .post('/auth/local/register')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.password).toBeUndefined();
        expect(body.confirmed).toBeFalsy();
        expect(body.blocked).toBeFalsy();
        expect(body.provider).toEqual('local');
        expect(body.username).toEqual('dummy');
        expect(body.email).toEqual('dummy@test.dev');
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate user email', () => {
    return request(baseUrl)
      .post('/auth/local/register')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(({ body }) => {
        expect(body.code).toEqual(400);
        expect(body.message).toEqual('User email already in use');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should successfully redirection after approving a provider', () => {
    return request(baseUrl)
      .get('/auth/google/callback')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });

  it('should send the reset password email link', () => {
    const email = 'dummy@test.dev';
    return request(baseUrl)
      .post('/auth/forgot-password')
      .set('Accept', 'application/json')
      .send(email)
      .expect(HttpStatus.OK);
  });

  it('should reset user password with a code (resetToken)', () => {
    const password = 'password';
    return request(baseUrl)
      .post('/auth/reset-password?resetToken=1234')
      .set('Accept', 'application/json')
      .send(password)
      .expect(HttpStatus.OK);
  });

  it('should validate a user account', () => {
    return request(baseUrl)
      .get('/auth/email-confirmation')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });

  it('should validate a user account', () => {
    const email = 'dummy@test.dev';
    return request(baseUrl)
      .post('/auth/send-email-confirmation')
      .set('Accept', 'application/json')
      .send(email)
      .expect(HttpStatus.OK);
  });
});
