const express = require('express');
const axios = require('axios');
const request = require('supertest'); // Use supertest for API testing
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory "database" for user validation
const mockDatabase = {
    user1: {
        password: '123456',
    },
};

// Mock authentication route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validate the username and password
    if (mockDatabase[username] && mockDatabase[username].password === password) {
        return res.status(200).json({ message: 'Login successful' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

// Start the server before running the tests
beforeAll(() => {
    server = app.listen(3000, () => console.log('Server running on port 3000'));
});

// Close the server after tests
afterAll(() => {
    server.close();
});

// Jest test suite for the login API
describe('Authentication API', () => {
    it('should return 200 and a success message for valid credentials', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'user1',
                password: '123456',
            })
            .expect('Content-Type', /json/)
            .expect(200); // Expect 200 status code

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
            .expect(401); // Expect 401 status code

        expect(response.body.message).toBe('Invalid credentials');
    });
});
