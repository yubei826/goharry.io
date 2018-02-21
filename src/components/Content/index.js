import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
`;

export default function Content({ children }) {
  return <ContentWrapper>{children}</ContentWrapper>;
}
