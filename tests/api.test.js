// const request = require('supertest');
const axios = require('axios');
const API_URL = process.env.API_URL || "http://nginx:8198/fetch";

describe('Service2 API Tests', () => {
    test('GET /api/system-info should return 200 and valid JSON', async () => {
        // // const response = await request(url).get('/api/system-info').auth('user1', '123456');
        console.log("i am here")
        const response = await axios.get(API_URL, {
            auth: {
                username: 'user1',
                password: '123456'
            }
        })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('service');
        expect(response.body).toHaveProperty('ip');
    });

});
