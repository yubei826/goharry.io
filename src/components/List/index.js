import React from "react";
import styled from "styled-components";

const List = styled.div`
  @media (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ItemComponent = styled.div`
  box-sizing: border-box;
  padding: 0 0.5rem 1rem 0;
  strong {
    font-size: 1.1rem;
  }
  @media (min-width: 700px) {
    width: 50%;
  }
  &:last-child {
    padding-bottom: 0;
  }
`;

const ItemContent = styled.div`
  padding-top: 0.3rem;
`;

export function Item({ label, children }) {
  return (
    <ItemComponent>
      <strong>{label}</strong>
      <ItemContent>{children}</ItemContent>
    </ItemComponent>
  );
}

export default ({ children }) => <List>{children}</List>;
