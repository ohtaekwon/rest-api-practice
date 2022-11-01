import React, { FC } from "react";
import styled from "styled-components";

import { MessageType } from "../types/messages";
import { UsersType } from "../types/users";

type Props = {};
const MsgList: FC<Props> = (): JSX.Element => {
  return (
    <React.Fragment>
      <Messages></Messages>
    </React.Fragment>
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
