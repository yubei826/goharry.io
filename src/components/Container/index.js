import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  padding: 0 1rem;
  margin: 0 auto;
`;

export default ({ children }) => <Container>{children}</Container>;
