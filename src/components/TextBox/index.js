import React from "react";
import styled from "styled-components";

const TextBox = styled.div`
  line-height: 1.7;
  text-align: justify;
`;

export default ({ children }) => <TextBox>{children}</TextBox>;
