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
