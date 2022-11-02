## 설치한 패키지 라이브러리

- `express`, `cors`, `uuid`, `nodemon`

```bash
yarn init -y

yarn add express cors uuid # express, cors, uuid 라이브러리

yarn add --dev nodemon # nodemon 패키지
```

- `nodemon`: 파일이 변경됐을 때마다, 서버를 다시 자동으로 띄워주는 역할을 한다.

## package.json

```json
  "scripts": {
    "start": "nodemon ./src/index.js"
  }
```

- script에 다음과 같은 내용을 추가한다.

## nodemon.json

```json
{
  "watch": ["src"],
  "ignore": ["db/**/*"],
  "env": {
    "NODE_ENV": "development"
  }
}
```

- `nodemon.json`이 실행이 될 때, 어떠한 것들을 감시하여 변경사항을 반영할지와 어떠한 것들은 변경을 무시할지에 대한 기능 역할을 한다.
- `watch` : 변경을 감시
- `ignore` : 변경이 되더라도 새로고침을 무시한다.
- `env` : 환경정보 세팅

## src 폴더 생성

- `database` 폴더에 `messages.json`, `users.json` 파일에 데이터 생성
- 각각의 json 데이터에서 CRUD를 위해서, JSON을 읽어오고, 덮어씌우는 방식의 `Data Control`을 만들어야 한다.
  - `src`폴더안에 `dbController.js` 파일에서 담당하도록 한다.

### 1) databaseController.js

- fs : node.js에서 제공되는 기능으로, file system 메서드들이 모여 있는 라이브러리이다.
- resolve : node.js에서 제공되는 기능으로, 경로 설정을 수정하기 위한 역할을 한다.

- ES6문법에서 `fs`를 사용하기 위해서 두 가지 방법

1. import를 통해 사용하기

- `package.json` 파일에 ` "type": "module"`을 추가한다.

```js
import fs from "fs";
```

2. 기본으로 로 사용하기

- `require`를 통해서, 변수에 할당한다.

```js
const fs = require("fs");
```

```js
const basePath = resolve(); // 현재에 있는 경로를 basePath 변수에 할당.

const fileNames = {
  messages: resolve(basePath, "src/database/messages.json"),
  users: resolve(basePath, "src/database/users.json"),
};
```

### 2) file을 `READ` 하고 `WRITE` 하는 기능

- READ

```js
export const readDB = (target) => {
  // messages or users을 선택하기 위해서 인자로, target에서 정한다.
  try {
    // readFileSync의 두번째 인자로 인코딩을 반드시 명시해야한다.
    return JSON.parse(fs.readFileSync(fileNames[target], "utf-8"));
  } catch (err) {
    console.log(err);
  }
};
```

- WRITE

```js
export const writeDb = (target, data) => {
  // 인자로, target뿐만 아니라, 새로 덮어씌울 data도 가져온다.
  try {
    // writeFileSync의 두번째 인자로, 덮어 씌울 데이터를 넣어준다.
    return fs.writeFileSync(fileNames[target], JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
```

### 2) index.js

- express app을 띄우기 위한 모든 기능들을 정리한다.
- `express`, `cors`를 import한다.

- express를 실행하여 app을 만든다.

```js
const app = express();
```

- express에서 url을 인코드

```js
app.use(express.urlencoded({ extended: true }));
```

- express에서 json형태로 사용

```js
app.use(express.json());
```

- 미들웨어 cors 추가하고, options을 추가한다.

```js
app.use(
  cors({
    // 특정 URL만 허용
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

- 서버를 실행한다.

```js
app.listen(8000, () => {
  console.log("server listening on 8000 port...");
});
```

## 서버 실행

### package.json

```json

  "scripts": {
    "start": "nodemon ./src/index.js"
  }

```

- `src`폴더 하위에 `index.js` 파일을 node명령어로 실행하고, `index.js`에서 `express`가 구동이 되단.
- 그때, `localhost:8000`을 구독을 하고 있는 상태가 된다.
- 실행이 잘 되는지 확인하기 위해서, 서버실행 코드 이전에 작성하면, `localhost:8000`에 접근시 `ok`가 나오게 된다.

```js
app.get("/", (req, res) => {
  res.send("ok");
});
```

## REST API

- `routes` 폴더 생성후, `messages.js` , `users.js`에서 각각의 `method`에 따라, `app`을 실행하도록 구현한다.
- messages와 users의 routes를 method조건에 맞게 배열을 만든다.
- 기본 규칙 예시

```js
const messagesRoute = [
  {
    // Get Messages
    method: "get",
    route: "/messages",
    handler: (req, res) => {
      res.send();
    },
  },
  {
    // Create Messages
    method: "post",
    route: "/messages",
    handler: (req, res) => {
      res.send();
    },
  },
  {
    // Update Messages
    method: "put",
    route: "/messages/:id",
    handler: (req, res) => {
      res.send();
    },
  },
  {
    // Delete Messages
    method: "delete",
    route: "/messages/:id",
    handler: (req, res) => {
      res.send();
    },
  },
];
```

- 그런 다음, `src/index.js` 파일에서 조건에 맞게 app의 method를 실행하도록 서버 실행전에 코드 추가

```js
messagesRoute.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});
```

## 완성 코드

- `routes/messages.js`

```js
import { v4 } from "uuid";
import { readDB, writeDB } from "../databaseController.js";

const getMsgs = () => readDB("messages");
const setMsgs = (data) => writeDB("messages", data);

const messagesRoute = [
  {
    // Get Messages
    method: "get",
    route: "/messages",
    handler: (req, res) => {
      const msgs = getMsgs();
      res.send(msgs);
    },
  },
  {
    // Get Message
    method: "get",
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const msg = msgs.find((msg) => msg.id === id);
        if (!msg) throw Error("Not Found Message");
        res.send(msg);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
  {
    // Create Messages
    method: "post",
    route: "/messages",
    handler: (req, res) => {
      const { body, query, params } = req; // req안에는 body, query, params가 들어 있고, body안에는 새 글이 등록된 text가 있다.
      const msgs = getMsgs();
      const newMsg = {
        id: v4(),
        text: body.text,
        userId: body.userId,
        timestamp: Date.now(),
      };
      msgs.unshift(newMsg);
      setMsgs(msgs);
      res.send(newMsg);
    },
  },
  {
    // Update Messages
    method: "put",
    route: "/messages/:id",
    handler: ({ body, query, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다";
        if (msgs[targetIndex].userId !== body.userId) throw "사용자가 다릅니다";

        const newMsgs = { ...msgs[targetIndex], text: body.text };
        msgs.splice(targetIndex, 1, newMsgs);
        setMsgs(msgs); // db에 저장
        res.send(newMsgs);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
  {
    // Delete Messages
    method: "delete",
    route: "/messages/:id",
    handler: ({ body, query, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== body.userId) throw "사용자가 다릅니다";

        msgs.splice(targetIndex, 1);
        setMsgs(msgs);
        res.send(id);
      } catch (err) {
        res.status(500).send({ error: err });
      }
      res.send();
    },
  },
];
export default messagesRoute;
```

- `routes/users.js`

```js
import { readDB, writeDB } from "../databaseController.js";

const getUsers = () => readDB("users");
const setUsers = (data) => writeDB("users", data);

const usersRoute = [
  {
    // Get Users
    method: "get",
    route: "/users",
    handler: (req, res) => {
      const users = getUsers();
      res.send(users);
    },
  },
  {
    // Get User
    method: "get",
    route: "/users/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const users = getUsers();
        const user = users[id];
        if (!user) throw Error("Not Found User Information");
        res.send(user);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
];
export default usersRoute;
```
