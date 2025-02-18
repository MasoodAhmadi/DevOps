const request = require('supertest');
const url = 'http://service2:3000';  // Ensure this points to service2, not localhost

describe('Service2 API Tests', () => {
    test('GET /api/system-info should return 200 and valid JSON', async () => {
        const response = await request(url).get('/api/system-info');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('service');
        expect(response.body).toHaveProperty('ip');
    });

});
