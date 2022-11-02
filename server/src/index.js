import express from "express";
import cors from "cors";

import messagesRoute from "./routes/messages.js";
import usersRoute from "./routes/users.js";

const app = express(); // express를 실행하여 app을 만든다.
app.use(express.urlencoded({ extended: true })); // express에서 url을 인코드
app.use(express.json()); // express에서 json형태로 사용
// 미들웨어 cors 추가하고, options을 추가한다.
app.use(
  cors({
    // 특정 URL만 허용
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.get("/", (req, res) => {
//   res.send("ok");
// });
const routes = [...messagesRoute, ...usersRoute];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

// 서버실행
app.listen(8000, () => {
  console.log("server listening on 8000 port...");
});
