const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema')

const app = express();

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema
}))

app.listen(4000, () => {
	console.log('listening at https://localhost:4000')
});