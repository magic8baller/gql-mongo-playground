const graphql = require('graphql');
// const _ = require('lodash');
// dummy data
const usersData = [
	{id: '1', name: 'Bond', age: 36, profession: 'Programmer'},
	{id: '13', name: 'Anna', age: 26, profession: 'Baker'},
	{id: '211', name: 'Bella', age: 16, profession: 'Mechanic'},
	{id: '19', name: 'Gina', age: 26, profession: 'Painter'},
	{id: '150', name: 'Georgina', age: 36, profession: 'Teacher'},
	{id: '2', name: 'sifis', age: 23, profession: 'artist'},
	{id: '3', name: 'Meli', age: 24, profession: 'retail assistant'},
	{id: '4', name: 'manolis', age: 50, profession: 'boss'},
	{id: '100', name: 'giorgo', age: 26, profession: 'graphic artist'},
	{id: '200', name: 'joyce', age: 40, profession: 'village bicycle'}
];

const hobbiesData = [
	{id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '150'},
	{id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donouts', userId: '211'},
	{id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211'},
	{id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '13'},
	{id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150'},

	{id: '6', title: 'Programming', description: 'Using computers to make the world a better place', userId: '2'},
	{id: '7', title: 'Rowing', description: 'Sweat and feel better before eating donouts', userId: '3'},
	{id: '8', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '4'},
	{id: '9', title: 'Fencing', description: 'A hobby for fency people', userId: '100'},
	{id: '10', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '200'},
];

const postsData = [
	{id: '1', comment: 'life as a slave to your father: a tale of insecurity and daddy issues', userId: '2'},
	{id: '2', comment: 'keeping up with 90 day fiance', userId: '3'},
	{id: '3', comment: 'inside look at a female midlife crisis', userId: '200'},
	{id: '4', comment: 'malakies for dummies', userId: '100'},
	{id: '5', comment: 'How to lose your keys in 30 seconds', userId: '4'},
	{id: '6', comment: 'where is my Mind', userId: '3'},
	{id: '7', comment: 'GraphQL is Amazing', userId: '150'},
	{id: '8', comment: 'How to Change the World', userId: '9'},
	{id: '9', comment: 'gamo tin panageia sou', userId: '2'},
	{id: '10', comment: 'how to get people to give u their money without them realizing', userId: '4'}
]

const personalitiesData = [
	{id: '1', sign: 'Aries', selfAware: false, traits: 'impulsive wild fun', userId: '200'},
	{id: '2', sign: 'Virgo', selfAware: true, traits: 'self loathing overly critical introvert', userId: '4'},
	{id: '3', sign: 'Saggitarius', selfAware: false, traits: 'outgoing unreliable transient', userId: '3'},
	{id: '4', sign: 'Leo', selfAware: false, traits: 'feisty combative party hard', userId: '100'},
	{id: '5', sign: 'Libra', selfAware: true, traits: 'balanced focused practical', userId: '2'},
]

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLBoolean,
	GraphQLList
} = graphql



//1-create types

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Documentation for User...',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
		profession: {type: GraphQLString},
		//all Posts**(many) that BELONG TO Userr(one) => use GraphQLList types

		posts: {
			type: new GraphQLList(PostType),
			resolve (parent, args) {
				//want ALL posts belong to Userr
				// return _.filter(postsData, {userId: parent.id});
				return postsData.filter(post => post.userId === parent.id)
			}
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve (parent, args) {
				return hobbiesData.filter(hobby => hobby.userId === parent.id)
			}
		},
		personalities: {
			type: new GraphQLList(PersonalityType),
			resolve (parent, args) {
				return personalitiesData.filter(personality => personality.userId === parent.id)
			}
		}


	})
});
const HobbyType = new GraphQLObjectType({
	name: 'Hobby',
	description: 'Hobby description',
	fields: () => ({
		id: {type: GraphQLID},
		title: {type: GraphQLString},
		description: {type: GraphQLString},
		user: {
			type: UserType,
			resolve (parent, args) {
				return usersData.find(user => user.userId === parent.id)
			}
		}
	})
});
const PersonalityType = new GraphQLObjectType({
	name: 'Personality',
	description: 'Personality description',
	fields: () => ({
		id: {type: GraphQLID},
		traits: {type: GraphQLString},
		sign: {type: GraphQLString},
		selfAware: {type: GraphQLBoolean},
		user: {
			type: UserType,
			resolve (parent, args) {
				return usersData.find(user => user.id === parent.id)

			}
		}
	})
})
const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'Post description',
	fields: () => ({
		id: {type: GraphQLID},
		comment: {type: GraphQLString},
		//now can query User field inside post queries
		user: {
			type: UserType,
			resolve (parent, args) {
				//parent = userId as ref to User Type
				return usersData.find(user => user.id === parent.userId)


			}
		}
	})
})
//2 - RootQuery = FETCH DATA -path lets us traverse the query (how is it mapped out so we can THEN start working with server)
//structure connecttions/queries
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Description',
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLID}},

			resolve (parent, args) {
				return usersData.find(user => user.id === args.id);
				//resolve w data u have from rootquery
				//get+ ACTUAL RETURN data from db/other datasource

			}
		},
		hobby: {
			type: HobbyType,
			args: {id: {type: GraphQLID}},

			resolve (parent, args) {
				//return hobby data
				return hobbiesData.find(hobby => hobby.id === args.id)
			}
		},
		post: {
			type: PostType,
			args: {id: {type: GraphQLID}},
			resolve (parent, args) {
				return postsData.find(post => post.id === args.id)
			}
		},
		personality: {
			type: PersonalityType,
			args: {id: {type: GraphQLID}},
			resolve (parent, args) {
				return personalitiesData.find(personality => personality.id === args.id)
			}
		}
	}
});

//MUTATIONS = modify data;
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: UserType,
			args: {
				id: {type: GraphQLID},
				name: {type: GraphQLString},
				age: {type: GraphQLInt},
				profession: {type: GraphQLString}
			},
			//create User object - saving in memory, not in DB yet
			resolve (parent, args) {
				let user = {
					id: args.id,
					name: args.name,
					age: args.age,
					profession: args.profession
				}
				return user;
			}
		},
		// 		mutation{
		//   createUser(name: "Leslie",age: 30, profession: "self-employed") {
		//     name
		//     age
		//     profession
		//     id
		//   }
		// }
		createPost: {
			type: PostType,
			args: {
				id: {type: GraphQLID},
				comment: {type: GraphQLString}
			},
			resolve (parent, args) {
				let post = {
					id: args.id,
					comment: args.comment
				}
				return post
			}
		},
		createPersonality: {
			type: PersonalityType,
			args: {
				id: {type: GraphQLID},
				traits: {type: GraphQLString},
				sign: {type: GraphQLString},
				selfAware: {type: GraphQLBoolean}
			},
			resolve (parent, args) {
				let personality = {
					id: args.id,
					traits: args.traits,
					sign: args.sign,
					selfAware: args.selfAware
				}
				return personality
			}
		},
		createHobby: {
			type: HobbyType,
			args: {
				id: {type: GraphQLID},
				title: {type: GraphQLString},
				description: {type: GraphQLString}
			},
			resolve (parent, args) {
				let hobby = {
					id: args.id,
					title: args.title,
					description: args.description
				}

				return hobby
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
