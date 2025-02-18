const request = require('supertest');
const app = require('../server');
let server;

describe('Service2 API Tests', () => {
    beforeAll((done) => {
        server = app.listen(0, () => {
            const { port } = server.address();
            console.log(`Service2 is running on port ${port}`);
            done();
        });
    });

    // afterAll(() => {
    //     server.close(() => {
    //         console.log('Server closed');
    //     });
    // });

    test('GET /api/system-info should return 200 and valid JSON', async () => {
        const response = await request(server).get('/api/system-info'); // Use the server instance
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('service', 'Service2');
        expect(response.body).toHaveProperty('ip');
        expect(typeof response.body.uptime).toBe('number');
        expect(response.body).toHaveProperty('diskSpace');
        expect(response.body.diskSpace).toHaveProperty('free');
        expect(response.body.diskSpace).toHaveProperty('available');
        const { ip, uptime, diskSpace } = response.body;
        const { free, available } = diskSpace;

        console.log(JSON.stringify({
            ip,
            uptime,
            diskSpace: {
                free,
                available
            },
            status: response.status
        }, null, 2));
    });

});
