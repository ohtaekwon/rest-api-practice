import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

import fetcher from "../fetcher";

import { MessageType } from "../types/messages";
import { UsersType } from "../types/users";

type Message = {
  id: number;
  userId: string;
  timestamp: number;
  text: string;
};

type Props = {};
const MsgList: FC<Props> = (): JSX.Element => {
  const {
    query: { userId = "" },
  } = useRouter();
  const [msgs, setMsgs] = useState<Message[]>([]); // 변경을 감지하기 위해서 state를 이용한다.
  const [editingId, setEditingId] = useState(null);

  const doneEdit = () => setEditingId(null);

  const onCrate = async (text) => {
    const newMsg = await fetcher("post", "/messages", {
      text,
      userId,
    });
    if (!newMsg) throw Error("post할 수 없습니다.");
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

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

  const onDelete = async (id) => {
    const receivedId = await fetcher("delete", `/messages/${id}`, {
      params: { userId },
    });
    setMsgs((msgs: any) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === receivedId + "");
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
            myId={userId}
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
