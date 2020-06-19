const request = require('supertest');
const server = require('../api/server');

describe('Register/Login Endpoint Testing', () => {
	describe('Can Successfully Register', () => {
		it('Returns Status 200', async () => {
			const response = await request(server)
				.post('/api/auth/register')
				.send({ username: 'John10', password: 'test' });
			expect(response.status).toBe(200);
		});
		it('Returns Username', async () => {
			const response = await request(server)
				.post('/api/auth/register')
				.send({ username: 'John11', password: 'test' });
			expect(response.body.username).toBe('John11');
		});
	});

	describe('Can Successfully Login', () => {
		it('Returns Status 201', async () => {
			const response = await request(server)
				.post('/api/auth/login')
				.send({ username: 'John8', password: 'test' });
			expect(response.status).toBe(201);
		});
		it('Returns Logged In Message', async () => {
			const response = await request(server)
				.post('/api/auth/login')
				.send({ username: 'John8', password: 'test' });
			expect(response.body.message).toBe('Logged In');
		});
	});
});
