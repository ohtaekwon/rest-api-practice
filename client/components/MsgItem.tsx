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
    <Wrapper>
      <Container>
        <Id>{userId} </Id>
        <Sub>
          {new Date(timestamp).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Sub>
        <Text>{text}</Text>
      </Container>
    </Wrapper>
  );
};

export default MsgItem;

const Wrapper = styled.ul`
  border: 1px solid #000;
  width: 100%;
  margin: 1rem 0;
  padding: 0;
`;
const Container = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;
const Id = styled.h3`
  margin: 0.5rem;
`;
const Sub = styled.sub`
  margin: 0.5rem;
`;
const Text = styled.h5`
  margin: 0.5rem;
`;
