require('dotenv').config();
import * as request from 'supertest';

describe('e2e Application', () => {
  const baseUrl = 'http://localhost:3000';

  it('should get swagger /api-docs', () => {
    return request(baseUrl)
      .get('/api-docs/')
      .expect(200);
  });
});
