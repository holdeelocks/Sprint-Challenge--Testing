const express = require('express');

const db = require('../data/dbConfig');

const server = express();
server.use(express.json());

server.post('/api/games', async (req, res) => {
	const { title, genre } = req.body;
	if (!title || !genre) {
		res.status(422).end();
	} else {
		const added = await db('games').insert(req.body);
		res.status(201).json(added);
	}
});

module.exports = server;
