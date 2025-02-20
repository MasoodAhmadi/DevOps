const express = require('express');
const axios = require('axios');
const request = require('supertest');
const app = express();

app.use(express.json());

const mockDatabase = {
    user1: {
        password: '123456',
    },
};
let isRunning = true;

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (mockDatabase[username] && mockDatabase[username].password === password) {
        return res.status(200).json({ message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

beforeAll(() => {
    server = app.listen(3000, () => console.log('Server running on port 3000'));
});

app.get('/', (req, res) => {
    if (!isRunning) {
        return res.status(503).json({ message: 'Service Unavailable' });
    }
    res.status(200).json({ message: 'Nginx is running' });
});

app.post('/stop', (req, res) => {
    if (!isRunning) {
        return res.status(400).json({ message: 'Nginx is already stopped' });
    }

    isRunning = false;
    server.close(() => {
        console.log('Mock Nginx stopped');
    });

    res.status(200).json({ message: 'Nginx stopped successfully' });
});

afterAll(() => {
    server.close();
});


describe('Authentication API', () => {
    it('should return 200 and a success message for valid credentials', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'user1',
                password: '123456',
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.message).toBe('Login successful');
    });

    it('should return 401 and an error message for invalid credentials', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'user1',
                password: 'wrongpassword',
            })
            .expect('Content-Type', /json/)
            .expect(401);

        expect(response.body.message).toBe('Invalid credentials');
    });

    describe('Nginx Service', () => {
        it('should return 200 when Nginx is running', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Nginx is running');
        });

        it('should stop Nginx and return a success message', async () => {
            const stopResponse = await request(app).post('/stop');
            expect(stopResponse.status).toBe(200);
            expect(stopResponse.body.message).toBe('Nginx stopped successfully');
        });

        it('should return 503 when trying to access Nginx after stopping', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(503);
            expect(response.body.message).toBe('Service Unavailable');
        });

        it('should return 400 if trying to stop Nginx when already stopped', async () => {
            const stopAgainResponse = await request(app).post('/stop');
            expect(stopAgainResponse.status).toBe(400);
            expect(stopAgainResponse.body.message).toBe('Nginx is already stopped');
        });
    });
});
