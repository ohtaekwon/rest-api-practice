import React, { FC, useRef } from "react";
import styled from "styled-components";

type Props = {
  mutate: any;
  id?: number | string;
};

const MsgInput: FC<Props> = (props): JSX.Element => {
  const { mutate, id = undefined } = props;
  const textRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const text = textRef.current.value;
    textRef.current.value = "";
    mutate(text, id);
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea ref={textRef} placeHolder={"내용을 입력해주세요"} />
      <Button type="submit">확인</Button>
    </Form>
  );
};
export default MsgInput;

const Form = styled.form`
  margin-top: 1rem;
  width: 100%;
  display: flex;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 1rem;
`;

const Button = styled.button`
  width: 5rem;
  margin-left: 0.5rem;
`;
