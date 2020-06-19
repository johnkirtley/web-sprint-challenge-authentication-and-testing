const request = require('supertest');
const server = require('../api/server');

describe('Testing Jokes Endpoint', () => {
	describe('Accessing Jokes Endpoint', () => {
		it('Returns Status 401 With Invalid Credentials', async () => {
			const response = await request(server).get('/api/jokes');
			expect(response.status).toBe(401);
		});
		it('Returns Shall Not Pass With Invalid Credentials', async () => {
			const response = await request(server).get('/api/jokes');
			expect(response.body.you).toBe('shall not pass!');
		});
	});
});
