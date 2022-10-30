import React from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import styled from "styled-components";
import MsgList from "../components/MsgList";
import { fetcher } from "../query/queryClient";
import { MessageType } from "../types/messages";
import { UsersType } from "../types/users";
import { GET_MESSAGES } from "../graphql/message";
import { GET_USERS } from "../graphql/users";

const Home: NextPage<{ smsgs: MessageType[]; users: UsersType }> = (props) => {
  const { smsgs, users } = props;
  console.log("smsgs", smsgs);
  return (
    <Main>
      <PageTitleContainer>
        <PageTitle>SIMPLE SNS</PageTitle>
      </PageTitleContainer>
      <MsgList smsgs={smsgs} users={users} />
    </Main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { messages: smsgs } = await fetcher(GET_MESSAGES);
  const { users } = await fetcher(GET_USERS);

  return {
    props: { smsgs, users },
  };
};

const Main = styled.main`
  width: 600px;
  margin: 0 auto;
`;
const PageTitleContainer = styled.div`
  width: 100%;
  display: flex;
`;
const PageTitle = styled.h1`
  box-sizing: border-box;
  margin: 0 auto;
`;
