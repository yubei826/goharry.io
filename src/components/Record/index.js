import React from "react";
import styled from "styled-components";
import TextBox from "../TextBox";

const Record = styled.div`
  padding: 0;
  padding-bottom: 3rem;
  &:last-child {
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  position: relative;
  @media (min-width: 700px) {
    border-top: solid 1px #eceff1;
    margin-top: 0.6rem;
    height: 0.6rem;
  }
`;

const Title = styled.h5`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  @media (min-width: 700px) {
    position: absolute;
    margin-top: -0.6rem;
    background: #fff;
    padding-right: 2rem;
  }
`;

const Duration = styled.div`
  @media (min-width: 700px) {
    position: absolute;
    margin-top: -0.5rem;
    display: inline-block;
    background: #fff;
    right: 0;
    padding-left: 2rem;
  }
`;

const Info = styled.div`
  padding: 1rem 0;
  display: flex;
`;

const Position = styled.div`
  flex: 1;
  font-weight: 600;
`;

export default ({
  title,
  startDate,
  endDate,
  position,
  website,
  summary,
  highlights
}) => {
  return (
    <Record>
      <Header>
        <Title>{title}</Title>
        <Duration>{`${startDate} — ${endDate}`}</Duration>
      </Header>
      <Info>
        <Position>{position}</Position>
        {website && <a href={website}>{website}</a>}
      </Info>
      <TextBox>{summary}</TextBox>
    </Record>
  );
};
