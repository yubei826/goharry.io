import React from "react";
import Link from "gatsby-link";
import styled, { css } from "styled-components";
import Button from "../Button";
import Content from "../Content";
import { BackIcon, ForwardIcon } from "../Icons";

const PaginationBox = styled.nav`
  display: inline-flex;
  padding-top: 2rem;
  width: 12rem;
`;

const NavigationItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #ddd;
  border-radius: 3px 0 0 3px;
  height: 38px;
  ${props =>
    props.next &&
    css`
      border-radius: 0 3px 3px 0;
      border-left: 0;
    `};
`;

const NavigationLink = styled(Link)`
  flex: 1;
  height: 38px;
  justify-content: center;
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(236, 239, 241, 0.4);
  }
`;

const getPageUrl = (pathPrefix, page) =>
  `${pathPrefix ? "/" + pathPrefix : ""}/${page.toString()}`;

export default function Pagination(props) {
  const { index, first, last, pageCount, pathPrefix } = props;
  if (first && last) return null;
  const previousUrl =
    index - 1 == 1 ? `/${pathPrefix}` : getPageUrl(pathPrefix, index - 1);
  const nextUrl = getPageUrl(pathPrefix, index + 1);
  return (
    <Content style={{ textAlign: "center" }}>
      <PaginationBox>
        <NavigationItem>
          <NavLink test={first} url={previousUrl} text="Previous" />
        </NavigationItem>
        <NavigationItem next>
          <NavLink test={last} url={nextUrl} text="Next" />
        </NavigationItem>
      </PaginationBox>
    </Content>
  );
}

function NavLink(props) {
  if (!props.test) {
    return <NavigationLink to={props.url}>{props.text}</NavigationLink>;
  }
  return <span style={{ color: "#999" }}>{props.text}</span>;
}
