import React from "react";
import styled, { css } from "styled-components";
import Link from "gatsby-link";

export const ButtonComponent = styled.button`
  height: 28px;
  font-size: 1rem;
  display: inline-flex;
  line-height: 1;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 3px;
  background: transparent;
  color: #607d8b;
  border: solid 1px #607d8b;
  box-sizing: border-box;
  outline: 0;
  cursor: pointer;
  ${props =>
    props.size === "large" &&
    css`
      height: 34px;
      padding-left: 1rem;
      padding-right: 1rem;
    `};
  ${props =>
    props.disabled &&
    css`
      border-color: #999;
      color: #999;
      cursor: default;
    `};
  ${props =>
    props.block &&
    css`
      height: 34px;
      display: flex;
      width: 100%;
    `};
  &:hover {
    background: ${props => (props.disabled ? "transparent" : "#607d8b")};
    border-color: ${props => (props.disabled ? "#999" : "#607d8b")};
    color: ${props => (props.disabled ? "#999" : "#fff")};
  }
`;

export const LinkButton = ButtonComponent.withComponent(Link);

export const URLButton = ButtonComponent.withComponent("a");

export default function Button(props) {
  if (props.to) {
    return <LinkButton {...props}>{props.children}</LinkButton>;
  }
  if (props.href) {
    return <URLButton {...props}>{props.children}</URLButton>;
  }
  return <ButtonComponent {...props}>{props.children}</ButtonComponent>;
}
