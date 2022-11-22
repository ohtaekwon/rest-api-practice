## 학습 목표

> REST API를 client에서 호출하도록 한다.
>
> 무한 스크롤을 구현한다.

## 사용한 패키지 라이브러리

- `axios`, `next/router`

## fetcher

- `client` 폴더 내 `fetcher`를 만들어 HTTP 통신을 담당하도록 한다.

```typescript
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const fetcher = async (method, url, ...rest) => {
  const response = await axios[method](url, ...rest);
  return response.data;
};
```

- 기본 URL을 지정한다 : `axios.defaults.baseURL = "http://localhost:8000";`

- `...rest` : `get/ delete` , `post/put` 과 같은 두가지 형태의 인자를 모두 대응하기 위해서 `...` 연산자 사용
  - get: axios.get(url[,config])
  - delete : axios.delete(url[,config])
  - post : axios.post(url, data[, config])
  - put : axios.put(url, data[, config])

## 초기 데이터 호출

```tsx
useEffect(async () => {
  const msgs = await fetcher("get", "/messages");
  setMsgs(msgs);
}, []);
```

- `useEffect`의 경우 내부에서 `async/await`를 사용하여 호출 할 수 없다.
- 따라서, 별도의 메서드를 만들어서 사용할 수 있다.

```tsx
const getMessages = async () => {
  const msgs = await fetcher("get", "/messages");
  setMsgs(msgs);
};

useEffect(() => {
  getMessages();
}, []);
```

## 데이터 POST - onCrate

- 데이터 호출을 위해서, 필요한 데이터가 `text`,`userId` 이다.
- 먼저, `userId`데이터를 얻기 위해서, 로그인 기능없이, next.js의 `Query`로 얻는 방법이 있다.
- `next/router`의 `useRouter`를 사용하여,
- `http://localhost:3000/?userId=jay` 일 경우,

```tsx
import { useRouter } from "next/router";

const { query } = useRouter();
const { userId } = query;
```

- 다음과 같이 `useRouter`의 `query`안에서 `userId`값은 `jay`로 호출이 된다.

```tsx
const onCrate = async (text) => {
  const newMsg = await fetcher("post", "/messages", {
    text,
    userId,
  });
  if (!newMsg) throw Error("post할 수 없습니다.");
  setMsgs((msgs) => [newMsg, ...msgs]);
};
```

## 데이터 PUT - onUpdate

- 데이터 호출을 위해 필요한 인자로, `text` 와 `id`이다.
- `fetcher`의 config 자리에, `text` 와 `userId`를 넣어준다.

```tsx
const onUpdate = async (text, id) => {
  const newMsg = await fetcher("put", `/messages/${id}`, {
    text,
    userId,
  });
  if (!newMsg) throw Error("put할 수 없습니다.");
  setMsgs((msgs) => {
    const targetIndex = msgs.findIndex((msg) => msg.id === id);
    if (targetIndex < 0) return msgs;
    const newMsgs = [...msgs]; // 새로운 배열로 만들고
    newMsgs.splice(targetIndex, 1, newMsg);
    return newMsgs;
  });
  doneEdit();
};
```

## 데이터 DELETE - onDelete

- 전해줄 데이터로, `userId`가 있다.
- 주의해야할 것은 `delete`의 경우, 앞서 말한것처럼 `axios.delete(url[,config])` 와 같은 특징이 있다.
- 즉, body로 데이터를 전달하는 것이 아니다.
- `params` 을 통해서, userId를 전달하고, 서버의 REST API에는 `query`로 받는다. (`query: { userId }`)

```tsx
const onDelete = async (id) => {
  const receivedId = await fetcher("delete", `/messages/${id}`, {
    params: { userId }, // params를 통해서 서버로 전달하고,
  });
  setMsgs((msgs: any) => {
    const targetIndex = msgs.findIndex((msg) => msg.id === receivedId + ""); // 문자로 형변환
    if (targetIndex < 0) return msgs;
    const newMsgs = [...msgs];
    newMsgs.splice(targetIndex, 1);
    return newMsgs;
  });
};
```

```js
    // sever REST API로는 query를 통해서 받아온다.
    handler: ({ query: { userId }, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== userId) throw "사용자가 다릅니다";

        msgs.splice(targetIndex, 1);
        setMsgs(msgs);
        res.send(id);
      } catch (err) {
        res.status(500).send({ error: err });
      }
      res.send();
    },

```

## 무한 스크롤
