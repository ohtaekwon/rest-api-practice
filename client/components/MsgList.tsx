import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

import fetcher from "../fetcher";

import { MessageType } from "../types/messages";
import { UsersType } from "../types/users";

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

type Message = {
  id: number;
  userId: string;
  timestamp: number;
  text: string;
};

type Props = {};
const MsgList: FC<Props> = (): JSX.Element => {
  const [msgs, setMsgs] = useState<Message[]>([]); // 변경을 감지하기 위해서 state를 이용한다.
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
  const getMessages = async () => {
    const msgs = await fetcher("get", "/messages");
    setMsgs(msgs);
  };

  useEffect(() => {
    getMessages();
  }, []);

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
const FetchMore = styled.div`
  border-color: transparent;
  height: 1px;
  margin-bottom: 1px;
  padding-bottom: 1px;
`;
