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
