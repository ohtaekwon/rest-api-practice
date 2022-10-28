import { gql } from "apollo-server-express";

const usersSchema = gql`
  type User {
    id: ID!
    nickName: String!
  }
  extend type Query {
    users: [User!]! # get Users
    user(id: ID!): User # get User
  }
`;
export default usersSchema;
