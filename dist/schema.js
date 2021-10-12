"use strict";

const typedef = `
  type Query {
    info: String!
    feed(filter: String,skip: Int, take: Int, orderBy:LinkOrderByInput): [Link!]!
  }
  
  input LinkOrderByInput {
    description: Sort
    url: Sort
    createdAt: Sort
  }

  enum Sort{
    asc
    desc
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    deletePost(id: ID!): Link
    updatePost(id:ID!, data:PostDataInput): Link!
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): User
  }
  
  type AuthPayload {
    token: String
    user: User
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
  }
  
  type Link {
    id: ID!
    description: String!
    url: String!
    postedBy: User
  }
  
  input PostDataInput {
    url:String
    description:String
  }
  
`;
module.exports = typedef;