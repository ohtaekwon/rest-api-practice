import React, { useState, FC, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import fetcher from "../fetcher";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

type Props = {};
const MsgList: FC<Props> = ({}: Props): JSX.Element => {
  const { query } = useRouter();
  const userId = query.userId || query.userid || "";
  const [msgs, setMsgs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const onCreate = async (text) => {
    const newMsg = await fetcher("post", "/messages", { text, userId });
    if (!newMsg) throw Error("something is wrong");
    setMsgs((msgs) => [newMsg, ...msgs]);
    console.log("msg", msgs);
  };

  const onUpdate = async (text, id) => {
    const newMsg = await fetcher("put", `/messages/${id}`, { text, userId });
    if (!newMsg) throw Error("something is wrong");
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id); // 값이 없으면 -1
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg);
      return newMsgs;
    });
    doneEdit();
  };
  const onDelete = async (id) => {
    const receivedId = await fetcher("delete", `/messages/${id}`, {
      params: { userId }, // object 주의
    });
    if (!receivedId) throw Error("something is wrong");

    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === receivedId + ""); // 값이 없으면 -1
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1 /* 새로운 데이터 없음*/);
      return newMsgs;
    });
  };

  const doneEdit = () => setEditingId(null);

  const getMessages = async () => {
    const msgs = await fetcher("get", "/messages");
    setMsgs(msgs);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <React.Fragment>
      {userId && <MsgInput mutate={onCreate} />}
      <Messages>
        {msgs.map((item) => (
          <MsgItem
            key={item.id}
            {...item}
            onUpdate={onUpdate}
            isEditing={editingId === item.id}
            startEdit={() => setEditingId(item.id)}
            onDelete={() => onDelete(item.id)}
            myId={userId}
          />
        ))}
      </Messages>
    </React.Fragment>
  );
};
export default MsgList;

const Messages = styled.ul`
  width: 100%;
  padding: 0;
`;
