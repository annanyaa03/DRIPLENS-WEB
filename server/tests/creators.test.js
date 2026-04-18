import request from 'supertest';
import app from '../index.js';

describe('GET /api/v1/creators', () => {
  it('returns paginated creators list', async () => {
    const res = await request(app).get('/api/v1/creators');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('creators');
    expect(res.body.data).toHaveProperty('pagination');
  });

  it('rejects invalid page param', async () => {
    const res = await request(app).get('/api/v1/creators?page=-1');
    expect(res.status).toBe(400);
  });
});

describe('GET /api/v1/creators/:id', () => {
  it('returns 404 for non-existent creator', async () => {
    const res = await request(app).get('/api/v1/creators/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });
});
