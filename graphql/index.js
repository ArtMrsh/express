const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');

const User = require('../models/user.model');
const Board = require('../models/board.model');
const List = require('../models/list.model');
const Task = require('../models/task.model');


const typeDefs = `

  type Query {
    users: [User]
    user(id: ID): User 
    boards: [Board]
    lists: [List]
    tasks: [Task]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Board {
    name: String!
    lists: [List]!
  }

  type List {
    name: String!
    boardId: Int!
    tasks: [Task]!
  }

  type Task {
    title: String!
    listId: Int!
    author: User!
  }

  type Mutation {
    addUser(user: UserInput!): User
    updateUser(user: UserInput!, id: ID!): User
    removeUser(id: ID!): User
  }

  input UserInput {
    name: String!
    email: String
  }

`;

const resolvers = {
  
  Query: {

    async users() {
      return await User.find({});
    },

    async user(parent, args) {
      const { id } = args;
      await User.findById(id);
    },

    async boards() {
      return await Board.find({})
    },

    async lists() {
      return await List.find({})
    },

    async tasks() {
      return await Task.find({})
    }

  },

  Mutation: {

    async addUser(root, { user: userInput }) {
      const user = new User(userInput);
      user.password = 'pass';
      return await user.save();
    },
    async updateUser(parent, args) {
      const { id, user } = args;
      return await User.findByIdAndUpdate(id, user, { new: true });
    },

    async removeUser(parent, args) {
      const { id } = args;
      return await User.findByIdAndRemove(id);
    }

  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = (app) => {
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};