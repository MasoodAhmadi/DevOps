const axios = require('axios');

const API_URL = process.env.API_URL || "http://nginx/fetch";
console.log("API_URL:", API_URL);
describe('Service2 API Tests', () => {
    test('GET /api/system-info should return 200 and valid JSON', async () => {
        console.log("Executing API test...");

        try {
            const response = await axios.get(API_URL, {
                auth: {
                    username: 'user1',
                    password: '123456',
                },
            });

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('service');
            expect(response.data).toHaveProperty('ip');

        } catch (error) {
            console.error("API request failed:", error.message);
            throw error;
        }
    });
});
