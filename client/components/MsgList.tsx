import React, { useState, FC } from "react";
import styled from "styled-components";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";
type Props = {};

const UserIds = ["roy", "jay"];
const getRandomUserId = () => UserIds[Math.round(Math.random())];
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

  return (
    <React.Fragment>
      <MsgInput mutate={onCreate} />
      <Messages>
        {msgs.map((item) => (
          <MsgItem key={item.id} {...item} />
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
