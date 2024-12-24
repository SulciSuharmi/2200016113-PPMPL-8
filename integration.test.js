const request = require('supertest');
const app = require('./app');

describe('Integration Testing for Express App', () => {
    it('should respond with Hello, World!! on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello, World!!');
    });

    it('should respond with JSON data on GET /api/data', async () => {
        const response = await request(app).get('/api/data');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Hello from API!',
            success: true
        });
    });

    it('should respond with 400 Bad Request if name is missing in POST /api/data', async () => {
        const response = await request(app).post('/api/data').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: 'Name is required'
        });
    });

    it('should respond with 201 Created and personalized message on POST /api/data', async () => {
        const name = 'John';
        const response = await request(app).post('/api/data').send({ name });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            message: `Hello, ${name}!`
        });
    });
});
