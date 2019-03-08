import supertest from 'supertest';
import app from './app';

describe('Test app.ts', () => {
  it('Just works.', async () => {
    const response = await supertest(app)
      .get(`/`)
      .send();

    expect(response.status).toEqual(200);
  });
});
