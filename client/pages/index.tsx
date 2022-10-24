import React from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import MsgList from "../components/MsgList";

const Home: NextPage = () => (
  <Main>
    <PageTitleContainer>
      <PageTitle>SIMPLE SNS</PageTitle>
    </PageTitleContainer>
    <MsgList />
  </Main>
);

export default Home;

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
