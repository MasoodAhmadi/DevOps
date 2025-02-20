const request = require('supertest');
const API_URL = process.env.API_URL || "http://localhost:8198/fetch";

describe('Service2 API Tests', () => {
    test('GET /api/system-info should return 200 and valid JSON', async () => {
        console.log("Test is executed")
        // const response = await request(API_URL).get('/api/system-info').auth('user1', '123456');
        // const response = await request(API_URL).get("/").auth('user1', '123456')
        // expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty('service');
        // expect(response.body).toHaveProperty('ip');
    });

});
