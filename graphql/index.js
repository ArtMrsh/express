const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const User = require('../models/user.model');
const Board = require('../models/board.model');
const List = require('../models/list.model');
const Task = require('../models/task.model');

const typeDefs = `

  type Query {
    users: [User]
    user(id: ID): User 
    boards: [Board]
    board(id: ID): Board
    lists: [List]
    list(id: ID): List
    tasks: [Task]
    task(id: ID): Task
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

    addBoard(board: BoardInput!): Board
    updateBoard(board: BoardInput!, id: ID!): Board
    removeBoard(id: ID!): Board

    addList(list: ListInput!): List
    updateList(list: ListInput!, id: ID!): List
    removeList(id: ID!): List

    addTask(task: TaskInput!): Task
    updateTask(task: TaskInput!, id: ID!): Task
    removeTask(id: ID!): Task

  }

  input UserInput {
    name: String!
    email: String
  }

  input BoardInput {
    name: String!
    lists: [ListInput]!
  }

  input ListInput {
    name: String!
    boardId: Int!
    tasks: [TaskInput]!
  }

  input TaskInput {
    title: String!
    listId: Int!
    author: UserInput
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

    async board(parent, args) {
      const { id } = args;
      await Board.findById(id);
    },

    async lists() {
      return await List.find({})
    },

    async list(parent, args) {
      const { id } = args;
      await Board.findById(id);
    },

    async tasks() {
      return await Task.find({})
    },

    async list(parent, args) {
      const { id } = args;
      await Task.findById(id);
    },

  },

  Mutation: {

    // users
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
    },

    // boards
    async addBoard(root, { board: BoardInput }) {
      const board = new Board(BoardInput);
      return await board.save();
    },
    async updateBoard(parent, args) {
      const { id, board } = args;
      return await Board.findByIdAndUpdate(id, board, { new: true });
    },
    async removeBoard(parent, args) {
      const { id } = args;
      return await Board.findByIdAndRemove(id);
    },

    // lists
    async addList(root, { list: listInput }) {
      const list = new List(listInput);
      list.password = 'pass';
      return await list.save();
    },
    async updateList(parent, args) {
      const { id, list } = args;
      return await List.findByIdAndUpdate(id, list, { new: true });
    },

    async removeList(parent, args) {
      const { id } = args;
      return await List.findByIdAndRemove(id);
    },

    // tasks
    async addTask(root, { task: taskInput }) {
      const task = new Task(taskInput);
      task.password = 'pass';
      return await task.save();
    },
    async updateTask(parent, args) {
      const { id, task } = args;
      return await Task.findByIdAndUpdate(id, task, { new: true });
    },

    async removeTask(parent, args) {
      const { id } = args;
      return await Task.findByIdAndRemove(id);
    }

  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = (app) => {
  app.use('/graphql', graphqlExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};
