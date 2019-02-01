exports.up = function(knex, Promise) {
	return knex.schema.createTable('games', function(tbl) {
		tbl.increments();
		tbl
			.string('title', 128)
			.notNullable()
			.unique();
		tbl.string('genre', 128).notNullable();
		tbl.integer('releaseYear').unsigned();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('games');
};
