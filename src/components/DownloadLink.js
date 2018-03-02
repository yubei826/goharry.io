import React from "react";
import styled from "styled-components";

const DownloadLink = styled.a`
  display: inline-flex;
  height: 38px;
  padding: 0 1rem;
  border-radius: 3px;
  border: solid 1px #90a4ae;
  align-items: center;
  color: #90a4ae;
  transition: all 0.5s;
  &:hover {
    color: #607d8b;
    background: rgba(0, 0, 0, 0.05);
  }
  @media print {
    display: none;
  }
`;

export default () => <DownloadLink href="/resume.pdf">下载PDF</DownloadLink>;
