import React from "react";
import styled from "styled-components";
import Container from "../Container";

const Content = styled.div`
  margin: 3rem 0;
  @media (min-width: 700px) {
    display: flex;
  }
`;

const Title = styled.h4`
  box-sizing: border-box;
  color: #b0bec5;
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0;
  margin-bottom: 1rem;
  @media (min-width: 700px) {
    width: 25%;
    text-align: right;
    padding-right: 2rem;
    margin-bottom: 0;
  }
`;

const ChildBox = styled.div`
  padding-top: 1rem;
  @media (min-width: 700px) {
    flex: 1;
    padding-top: 0;
  }
`;

export default ({ title, children }) => (
  <Container>
    <Content>
      <Title>{title}</Title>
      <ChildBox>{children}</ChildBox>
    </Content>
  </Container>
);
