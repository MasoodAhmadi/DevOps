const request = require('supertest');

describe('Service2 API Tests', () => {
    test('GET /api/system-info should return 200 and valid JSON', async () => {
        const response = await request('http://localhost:3000').get('/api/system-info');

        console.log("Response:", response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('service', 'Service2');
        expect(response.body).toHaveProperty('ip');
        expect(typeof response.body.uptime).toBe('number');

        expect(response.body).toHaveProperty('diskSpace');

    });

});
