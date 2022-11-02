import React from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import styled from "styled-components";

import MsgList from "../components/MsgList";

import { MessageType } from "../types/messages";
import { UsersType } from "../types/users";

type Props = {};

const Home: NextPage<Props> = (props) => {
  return (
    <Main>
      <PageTitleContainer>
        <PageTitle>SIMPLE SNS</PageTitle>
      </PageTitleContainer>
      <MsgList />
    </Main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
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
