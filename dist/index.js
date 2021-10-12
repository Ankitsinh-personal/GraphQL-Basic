"use strict";

const {
  ApolloServer
} = require('apollo-server');

const {
  PrismaClient
} = require("@prisma/client");

const Query = require('./resolvers/Query');

const Mutation = require('./resolvers/Mutation');

const User = require('./resolvers/User');

const Link = require('./resolvers/Link');

const {
  makeExecutableSchema
} = require('@graphql-tools/schema');

const typedef = require('./schema');

const {
  applyMiddleware
} = require('graphql-middleware');

const permission = require('./utils/rules');

const prisma = new PrismaClient();
const schema = makeExecutableSchema({
  typeDefs: typedef,
  resolvers: {
    Query: Query,
    Mutation: Mutation,
    User,
    Link
  }
});
const server = new ApolloServer({
  schema: applyMiddleware(schema, permission),
  // typeDefs: fs.readFileSync(
  //     path.join(__dirname, 'schema.graphql'),
  //     'utf8'
  // ),
  // resolvers:{
  //     Query:Query,
  //     Mutation:Mutation,
  //     User,
  //     Link
  // },
  context: ({
    req
  }) => ({
    req,
    prisma
  }) // context:({req})=> {
  //     return{
  //         req,
  //         prisma,
  //         // userId: req && req.headers.authorization ? getUserId(req) : null
  //     }
  // }

});
server.listen().then(({
  url
}) => {
  console.log(`server is running on: ${url}`);
});