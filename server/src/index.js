import express from "express";
import { ApolloServer } from "apollo-server-express";
import { readDB } from "./dbController.js";
import resolvers from "./resolvers/index.js";
import schema from "./schema/index.js";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    // resolver들이 참조할 데이터
    models: {
      messages: readDB("messages"),
      users: readDB("users"),
    },
  },
});
const app = express();
await server.start();
server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"], // 클라이언트 서버
    credentials: true,
  },
});

await app.listen(8000);
console.log("server listening on 8000");

// 교체

// import express from 'express'
// import cors from 'cors'
// import messagesRoute from './routes/messages.js'
// import usersRoute from './routes/users.js'

// const app = express()
/* apollo server사용시 필요없어짐 */
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   }),
// )

// // app[method](route, handler)

// const routes = [...messagesRoute, ...usersRoute]
// routes.forEach(({ method, route, handler }) => {
//   app[method](route, handler)
// })

// app.listen(8000, () => {
//   console.log('server listening on 8000...')
// })
