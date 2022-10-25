import React, { useState, FC } from "react";
import styled from "styled-components";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";
type Props = {};

const UserIds = ["블랙핑크", "손흥민", "BTS", "아이유"];
const getRandomUserId = () => UserIds[Math.round(Math.random() * 3)];
const originalMsgs = Array(50)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    userId: getRandomUserId(),
    timestamp: 123456789123 + index * 1000 * 60,
    text: `${index + 1} mock text`,
  }))
  .reverse();

const MsgList: FC<Props> = (props: Props): JSX.Element => {
  const {} = props;
  const [msgs, setMsgs] = useState(originalMsgs);
  const [editingId, setEditingId] = useState(null);

  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} - ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
    console.log("msg", msgs);
  };

  const onUpdate = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id); // 값이 없으면 -1
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, {
        // 새로운 메시지
        ...msgs[targetIndex],
        text,
      });
      return newMsgs;
    });
    doneEdit();
  };
  const onDelete = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id); // 값이 없으면 -1
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1 /* 새로운 데이터 없음*/);
      return newMsgs;
    });
  };

  const doneEdit = () => setEditingId(null);
  return (
    <React.Fragment>
      <MsgInput mutate={onCreate} />
      <Messages>
        {msgs.map((item) => (
          <MsgItem
            key={item.id}
            {...item}
            onUpdate={onUpdate}
            isEditing={editingId === item.id}
            startEdit={() => setEditingId(item.id)}
            onDelete={() => onDelete(item.id)}
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
