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
});
