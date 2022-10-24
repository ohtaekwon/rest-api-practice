import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  userId: string;
  timestamp: number;
  text: string;
};
const MsgItem: FC<Props> = (props): JSX.Element => {
  const { userId, timestamp, text } = props;
  return (
    <ul>
      <h3>
        {userId}{" "}
        <sub>
          {new Date(timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </sub>
      </h3>
      {text}
    </ul>
  );
};

export default MsgItem;
