const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLBoolean,
	GraphQLInt,
	GraphQLFloat,
	GraphQLNonNull,
	GraphQLSchema
} = graphql

//Scalar Types - not an object (primitive)
/*
 * String = GraphQLString (etc)
 * Int
 * Float
 * Boolean
 * ID
 */

const Person = new GraphQLObjectType({
	name: 'Person',
	description: 'Representation of Person Type',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: new GraphQLNonNull(GraphQLString)},
		hungry: {type: GraphQLBoolean},
		age: {type: GraphQLInt},
		gpa: {type: GraphQLFloat},
		someType: {
			type: Person,
			resolve (parent, args) {
				return parent
			}
		}
	})
})

//RootQuery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'description',
	fields: {
		person: {
			type: Person,
				// args: {
				// 	id: {type: GraphQLID},
				// 	name: {type: GraphQLString},
				// 	age: {type: GraphQLInt},
				// 	hungry: {type: GraphQLBoolean},
				// 	gpa: {type: GraphQLFloat}
				// },
			resolve (parent, args) {
				//resolve w data = get & return data from datasource
				let personObj = {
					id: 1,
					name: 'Billy Bob',
					age: 36,
					hungry: true,
					gpa: 3.1
				}
				return personObj
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})