const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema')
const PORT = process.env.PORT || 4000;
const app = express();

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema
}))

app.listen(PORT, () => {
	console.log(`listening at https://localhost:${PORT}`)
});