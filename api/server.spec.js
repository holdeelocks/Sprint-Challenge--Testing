const request = require('supertest');
const server = require('./server');

describe('GET /games endpoint', () => {});

describe('POST /games endpoint', () => {
	it('should send 422 if no title or genre', async () => {
		let response = await request(server)
			.post('/api/games')
			.send({});

		expect(response.status).toBe(422);

		response = await request(server)
			.post('/api/games')
			.send({ title: 'Teenage Mutant Ninja Turtles' });

		expect(response.status).toBe(422);

		response = await request(server)
			.post('/api/games')
			.send({ genre: 'Puzzle' });

		expect(response.status).toBe(422);
	});
	it('should send back 201 if added to database', async () => {
		let response = await request(server)
			.post('/api/games')
			.send({ title: 'Teenage Mutant Ninja Turtles', genre: 'Fighting' });

		expect(response.status).toBe(201);
	});
});
