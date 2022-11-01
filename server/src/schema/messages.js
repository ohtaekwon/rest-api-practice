import { gql } from "apollo-server-express";

const messagesSchema = gql`
  type Message {
    id: ID!
    text: String!
    userId: ID!
    timestamp: Float # 13 자리 숫자
  }
  extend type Query {
    messages(cursor: ID): [Message!]! # get Messages
    message(id: ID!): Message! # get Message
  }
  extend type Mutation {
    createMessage(text: String!, userId: ID!): Message!
    updateMessage(id: ID!, text: String, userId: ID!): Message!
    deleteMessage(id: ID!, userId: ID!): ID!
  }
`;
export default messagesSchema;
