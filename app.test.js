//app.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
    it('responds with Hello, World!!', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello, World!!');
    });
});

describe('GET /api/data', () => {
    it('responds with JSON data', async () => {
        const res = await request(app).get('/api/data');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Hello from API!', success: true });
    });
});

describe('POST /api/data', () => {
    it('responds with 400 if name is not provided', async () => {
        const res = await request(app).post('/api/data').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Name is required' });
    });

    it('responds with 201 and message if name is provided', async () => {
        const name = 'John Doe';
        const res = await request(app).post('/api/data').send({ name });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ message: `Hello, ${name}!` });
    });
});
