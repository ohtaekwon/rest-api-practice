import { gql } from "apollo-server-express";
import messagesSchema from "./messages.js";
import usersSchema from "./users.js";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, messagesSchema, usersSchema];
