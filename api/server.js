const express = require('express');

const db = require('../data/dbConfig');

const server = express();
server.use(express.json());

server.post('/api/games', async (req, res) => {
	const { title, genre } = req.body;
	if (!title || !genre) {
		res.status(422).end();
	} else {
		try {
			const [id] = await db('games').insert(req.body);
			const newGame = await db('games')
				.where({ id })
				.first();
			res.status(201).json(newGame);
		} catch (err) {
			res.status(405).end();
		}
	}
});

server.get('/games/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const game = await db('games')
			.where({ id })
			.first();
		if (!game) {
			res.status(422).end();
		} else {
			res.status(200).json(game);
		}
	} catch (err) {
		res.status(500).end();
	}
});

server.get('/api/games', async (req, res) => {
	const games = await db('games');
	res.status(200).json(games);
});

module.exports = server;
