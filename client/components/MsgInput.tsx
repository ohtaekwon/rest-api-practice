import React, { FC } from "react";
import styled from "styled-components";

type Props = {};

const MsgInput: FC<Props> = (props): JSX.Element => {
  return (
    <Form>
      <TextArea placeHolder={"내용을 입력해주세요"} />
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
