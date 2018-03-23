import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const FooterComponent = styled.footer`
  border-top: solid 1px #ddd;
  background: #fff;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
`;

export default function Footer({ title }) {
  const year = new Date().getFullYear();
  return (
    <FooterComponent>
      <div className="content">
        <FooterContent>&copy;{year} All rights reserved</FooterContent>
      </div>
    </FooterComponent>
  );
}
