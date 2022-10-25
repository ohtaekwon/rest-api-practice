import React, { FC } from "react";
import styled from "styled-components";
import MsgInput from "./MsgInput";

type Props = {
  id: number;
  userId: string;
  timestamp: number;
  text: string;
  onUpdate: (text, id) => void;
  isEditing: boolean;
  startEdit: () => void;
  onDelete: (id: number) => void;
  myId: string | string[] | undefined;
};
const MsgItem: FC<Props> = (props): JSX.Element => {
  const {
    id,
    userId,
    timestamp,
    text,
    onUpdate,
    isEditing,
    startEdit,
    onDelete,
    myId,
  } = props;

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
        <TextContainer>
          {isEditing ? (
            <>
              <MsgInput mutate={onUpdate} id={id} text={text} />
            </>
          ) : (
            <Text>{text}</Text>
          )}
        </TextContainer>
        {myId === userId && (
          <ButtonContainer>
            <Button type="button" onClick={startEdit}>
              수정하기
            </Button>
            <Button type="button" onClick={onDelete}>
              삭제하기
            </Button>
          </ButtonContainer>
        )}
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
  /* background-color: #a0c0d7; */
`;
const Container = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 1rem;
  box-sizing: border-box;
`;
const Id = styled.h3`
  margin: 0.5rem;
`;
const Sub = styled.sub`
  margin: 0.5rem;
`;
const TextContainer = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;
const Text = styled.h5``;
const ButtonContainer = styled.div`
  display: flex;
  padding: 1rem;
`;
const Button = styled.button`
  width: 100%;
`;
