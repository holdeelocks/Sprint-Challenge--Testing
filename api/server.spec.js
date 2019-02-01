const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

afterEach(async () => {
	await db('games').truncate();
});

describe('GET /games endpoint', () => {
	it('should return status code 200', async () => {
		let response = await request(server).get('/api/games');

		expect(response.status).toBe(200);
	});
	it('should return empty array if no items in db', async () => {
		let response = await request(server).get('/api/games');

		expect(response.body).toEqual([]);
	});
	it('should return an array with the games', async () => {
		const addGame = await request(server)
			.post('/api/games')
			.send({ title: 'Teenage Mutant Ninja Turtles', genre: 'Fighting' });

		let response = await request(server).get('/api/games');

		expect(response.body).toHaveLength(1);
		expect(response.body).toEqual([
			{ title: 'Teenage Mutant Ninja Turtles', genre: 'Fighting', id: 1, releaseYear: null }
		]);
	});
});

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
	it('should send back object added to db', async () => {
		let response = await request(server)
			.post('/api/games')
			.send({ title: 'Mortal Kombat 3', genre: 'Fighting' });

		expect(response.body).toEqual({
			id: 1,
			releaseYear: null,
			title: 'Mortal Kombat 3',
			genre: 'Fighting'
		});
	});
});
