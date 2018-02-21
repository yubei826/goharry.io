import React from "react";
import styled from "styled-components";
import Content from "../Content";

const Master = styled.div`
  background: #eceff1;
  padding: 2rem 0;
`;

export default function MasterHeader({ children }) {
  return (
    <Master>
      <Content>{children}</Content>
    </Master>
  );
}
