const { Pool } = require('pg');

//configure this if you're playing with a db
const configs = {
    user: 'zachariah',
    host: '127.0.0.1',
    database: 'psql_sandbox',
    password: 'zachariah',
    port: 5432,
};

const pool = new Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});


module.exports = {
    poolEnd: async () => {
        await pool.end(() => console.log('\nShut down db connection pool'));
    },

    query: async (queryText, queryValues) => {

        try {

            const client = await pool.connect();
            console.log('connected!');

            const res = await client.query(queryText, queryValues);

            client.release();
            console.log('client released!');

            return res;

        } catch (e) {
            console.log(`Error\n` + e.message, e.stack);
        }
    }
}