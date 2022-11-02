import React, { FC, useState } from "react";
import styled from "styled-components";

import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];
const originalMsgs = Array(50)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    userId: getRandomUserId,
    timestamp: 1234567890123 + index * 1000 * 60,
    text: `${index + 1} mock text`,
  }))
  .reverse();

type Message = {
  id: number;
  userId: () => string;
  timestamp: number;
  text: string;
};

type Props = {};
const MsgList: FC<Props> = (): JSX.Element => {
  const [msgs, setMsgs] = useState<Message[] | any>(originalMsgs); // 변경을 감지하기 위해서 state를 이용한다.
  const [editingId, setEditingId] = useState(null);

  const onCrate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };
  const doneEdit = () => setEditingId(null);

  const onUpdate = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs]; // 새로운 배열로 만들고
      newMsgs.splice(targetIndex, 1, {
        // 새로운 메시지
        ...msgs[targetIndex],
        text, // text만 새것으로
      });
      return newMsgs;
    });
    doneEdit();
  };

  const onDelete = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };
  console.log("msgs", msgs);
  return (
    <>
      <MsgInput mutate={onCrate} />
      <Messages>
        {msgs.map((msg) => (
          <MsgItem
            key={msg.id}
            id={msg.id}
            userId={msg.userId}
            timestamp={msg.timestamp}
            text={msg.text}
            onUpdate={onUpdate}
            onDelete={() => onDelete(msg.id)}
            startEdit={() => setEditingId(msg.id)}
            isEditing={editingId === msg.id}
          />
        ))}
      </Messages>
    </>
  );
};
export default MsgList;

const Messages = styled.ul`
  width: 100%;
  padding: 0;
`;
