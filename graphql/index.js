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
    boards: [Board]
    lists: [List]
    tasks: [Task]
  }

  type User {
    id: ID!
    name: String
    email: String
  }

  type Board {
    name: String,
    lists: [List]
  }

  type List {
    name: String,
    boardId: Int,
    tasks: [Task]
  }

  type Task {
    title: String,
    listId: Int,
    author: String
  }

  type Mutations {
    addUser(user:UserInput!): User
  }

  input UserInput {
    name: String!,
    email: String
  }

`;

const resolvers = {
  Query: {

    users() {
      return User.find({});
    },

    boards() {
      return Board.find({})
    },

    lists() {
      return List.find({})
    },

    tasks() {
      return Task.find({})
    }

  },

  Mutations: {
    async addUser(root, { user: userInput }) {
      const user = new User(userInput);
      user.password = '1111';
      await user.save();
      return user.toObject();
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = (app) => {
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};
