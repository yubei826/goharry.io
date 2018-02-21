import React, { Component } from "react";
import styled from "styled-components";
import MasterHeader from "../MasterHeader";
import Content from "../Content";

const PageTitle = styled.h1`
  margin: 0;
  text-transform: uppercase;
`;

const PageContent = styled.div`
  padding-top: 1.5rem;
`;

export default ({ title, children }) => (
  <div className="page">
    <MasterHeader>
      <PageTitle>{title}</PageTitle>
    </MasterHeader>
    <Content>
      <PageContent>{children}</PageContent>
    </Content>
  </div>
);
