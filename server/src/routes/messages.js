import { v4 } from "uuid";
import { readDB, writeDB } from "../dbController.js";

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
    handler: ({ params: { id }, res }) => {
      try {
        const msgs = getMsgs();
        const msg = msgs.find((m) => m.id === id);
        if (!msg) throw Error("not Found");
        res.send(msg);
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  {
    // Create Messages
    method: "post",
    route: "/messages",
    handler: ({ body, params, query }, res) => {
      try {
        if (!body.userId) throw Error("no userId");
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
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  {
    // Update Messages
    method: "put",
    route: "/messages/:id",
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        const newMsg = { ...msgs[targetIndex], text: body.text };
        msgs.splice(targetIndex, 1, newMsg);
        setMsgs(msgs);
        res.send(newMsg);
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  {
    // Delete Messages
    method: "delete",
    route: "/messages/:id",
    handler: ({ params: { id }, query: { userId } }, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다. ";
        if (msgs[targetIndex].userId !== userId) throw "사용자가 다릅니다.";
        msgs.splice(targetIndex, 1);
        res.send(id);
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
];

export default messagesRoute;
