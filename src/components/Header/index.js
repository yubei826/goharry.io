import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Container from "../Container";
import DownloadLink from "../DownloadLink";

const HeaderWrapper = styled.div`
  background: #eceff1;
  padding: 3rem 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 700px) {
    padding-left: 25%;
  }
`;

const Name = styled.h1`
  font-size: 2.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  margin-top: 0;
`;

const Label = styled.h2`
  font-size: 1.6rem;
  color: #90a4ae;
  font-weight: 400;
  margin-bottom: 0;
`;

const Title = styled.div`
  flex: 1;
`;

const Header = ({ name, label }) => (
  <HeaderWrapper>
    <Container>
      <Content>
        <Title>
          <Name>{name}</Name>
          <Label>{label}</Label>
        </Title>
        <DownloadLink />
      </Content>
    </Container>
  </HeaderWrapper>
);

export default Header;
