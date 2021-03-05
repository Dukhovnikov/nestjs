import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as users from '../utils/users.json';
import * as files from '../utils/files.json';
import * as mz from 'mz';
import * as path from 'path';
import * as glob from 'glob';
import { baseUrl, db, uploadFolderName } from './env-variables';
import { UserSchema } from '../src/models/user.schema';
import { FileSchema } from '../src/models/file.schema';
import { HttpStatus } from '@nestjs/common';
import { SignInDto } from '../src/auth/auth.dto';
import axios from 'axios';

const authModel = mongoose.model('User', UserSchema);
const fileModel = mongoose.model('File', FileSchema);

const userLogin: SignInDto = {
  email: 'help@incodewetrust.dev',
  password: 'password',
};

let jwtToken: string;
const filePath = `${__dirname}/logoE2ETesting.png`;
const uploadFilePath = path.join(__dirname, '..', uploadFolderName);

beforeAll(async () => {
  jest.setTimeout(100000);
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await authModel.deleteMany({});
  await fileModel.deleteMany({});
  await authModel.insertMany(users);
  const {
    data: { jwt },
  } = await axios.post(`${baseUrl}/auth/local`, userLogin);

  await fileModel.insertMany(files);
  jwtToken = jwt;
});

afterAll(async () => {
  await authModel.deleteMany({});
  await fileModel.deleteMany({});
  await mongoose.connection.close();
  await glob(
    `${uploadFilePath}/logoE2ETesting_*.png`,
    async (er: Error | null, files: string[]) =>
      await files.map(file => mz.fs.unlink(file)),
  );
});

describe('Upload e2e testing', () => {
  it('should retrieve the total number of uploaded files', async () => {
    return request(baseUrl)
      .get('/upload/files/count')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body.count).toEqual(6);
      })
      .expect(HttpStatus.OK);
  });

  it('should retrieve all files', () => {
    return request(baseUrl)
      .get('/upload/files')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body.length).toEqual(6);
        expect(body[0].name).toEqual('2422445');
        expect(body[1].name).toEqual(
          'wxe2ea491cad31039c.o6zAJsy4HissyNWbdrXzCWc0TgUE.VkludHXkx5A065b3444a7210086b93e8901b632fea77',
        );
        expect(body[2].name).toEqual(
          'wxe2ea491cad31039c.o6zAJsy4HissyNWbdrXzCWc0TgUE.kgmd6Uu9wtsQ65b3444a7210086b93e8901b632fea77',
        );
        expect(body[3].name).toEqual(
          'wxe2ea491cad31039c.o6zAJsy4HissyNWbdrXzCWc0TgUE.uH0pKspQJyxI65b3444a7210086b93e8901b632fea77',
        );
        expect(body[4].name).toEqual(
          'wxe2ea491cad31039c.o6zAJsy4HissyNWbdrXzCWc0TgUE.dTAtvkcUL0Gi65b3444a7210086b93e8901b632fea77',
        );
        expect(body[5].name).toEqual('2422445');
      })
      .expect(HttpStatus.OK);
  });

  it('should retrieve a single file depending on its id', () => {
    return request(baseUrl)
      .get('/upload/files/5f5db8760a43ee0c6a1f1498')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.name).toEqual(
          'wxe2ea491cad31039c.o6zAJsy4HissyNWbdrXzCWc0TgUE.uH0pKspQJyxI65b3444a7210086b93e8901b632fea77',
        );
        expect(body.alternativeText).toBeNull();
        expect(body.caption).toBeNull();
        expect(body.hash).toEqual(
          'wxe2ea491cad31039c_o6z_AJ_sy4_Hissy_NW_bdr_Xz_CW_c0_Tg_UE_u_H0p_Ksp_QJ_yx_I65b3444a7210086b93e8901b632fea77_da699a5828',
        );
        expect(body.ext).toEqual('.png');
        expect(body.mime).toEqual('image/png');
        expect(body.size).toEqual(5.25);
        expect(body.width).toEqual(132);
        expect(body.height).toEqual(132);
        expect(body.url).toEqual(
          '/uploads/wxe2ea491cad31039c_o6z_AJ_sy4_Hissy_NW_bdr_Xz_CW_c0_Tg_UE_u_H0p_Ksp_QJ_yx_I65b3444a7210086b93e8901b632fea77_da699a5828.png',
        );
        expect(body.provider).toEqual('local');
        expect(body.related).toEqual([]);
      })
      .expect(HttpStatus.OK);
  });

  it('should delete an uploaded file', async done => {
    const resp = await request(baseUrl)
      .del('/upload/files/5f5db8150a43ee0c6a1f1493')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`);

    const count = await fileModel.countDocuments();
    expect(count).toEqual(5);
    expect(resp.status).toBe(HttpStatus.OK);

    done();
  });

  it('should upload a file', async () => {
    const filePathToUpload = await mz.fs.exists(filePath);

    expect(filePathToUpload).toBeTruthy();

    return request(baseUrl)
      .post('/upload/')
      .attach('file', filePath)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        expect(body.name).toEqual('logoE2ETesting');
        expect(body.mime).toEqual('image/png');
        expect(body.size).toEqual(16079);
        expect(body.width).toEqual(1103);
        expect(body.height).toEqual(208);
        expect(body.url).toEqual(`/${uploadFolderName}/${body.hash}.png`);
        expect(body.ext).toEqual('.png');
        expect(body.provider).toEqual('local');
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
      })
      .expect(HttpStatus.CREATED);
  });
});
