const express = require('express');

const db = require('../data/dbConfig');

const server = express();
server.use(express.json());

server.post('/api/games', async (req, res) => {
	const { title, genre } = req.body;
	if (!title || !genre) {
		res.status(422).end();
	} else {
		const [id] = await db('games').insert(req.body);
		const newGame = await db('games')
			.where({ id })
			.first();
		res.status(201).json(newGame);
	}
});

server.get('/api/games', async (req, res) => {
	const games = await db('games');
	res.status(200).json(games);
});

module.exports = server;
