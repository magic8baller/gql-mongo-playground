const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql

//1-create types

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Documentation for User...',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
	})
});

//2 - RootQuery = path lets us traverse the query (how is it mapped out so we can THEN start working with server)
//structure connecttions/queries
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Description',
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLString}},

			resolve (parent, args) {
				//resolve w data u have from rootquery
				//get+ ACTUAL RETURN data from db/other datasource

			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
