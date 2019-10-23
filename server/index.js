const express = require('express');
const graphqlHTTP = require('express-graphql');

// const schema = require('./schema')
const testSchema = require('./schema/types_schema');
const PORT = process.env.PORT || 4000;
const app = express();

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema: testSchema
}))

app.listen(PORT, () => {
	console.log(`listening at https://localhost:${PORT}`)
});