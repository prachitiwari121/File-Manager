// tests/authController.test.js
const request = require('supertest');
const express = require('express');
const authController = require('../controllers/authController'); // Update this path
const db = require('../db');

const app = express();

// Mocking the database query function
jest.mock('../db', () => ({
  none: jest.fn(),
  oneOrNone: jest.fn(),
}));

// Use authController as middleware in the route
app.post('/register', authController);

describe('Auth Controller', () => {
  afterEach(() => {
    // Clear mock implementation after each test
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    // Mock database query response
    db.none.mockResolvedValueOnce();

    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: 'User registered successfully',
    });
  });

  it('should handle registration error', async () => {
    // Mock UniqueViolationError (user already exists)
    db.none.mockRejectedValueOnce({
      code: '23505',
    });

    const response = await request(app)
      .post('/register')
      .send({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'testpassword',
      });

    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual({
      success: false,
      error: 'User with this username or email already exists',
    });
  });

  // Add more test cases for login, error handling, etc.
});
