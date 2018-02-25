import React from "react";
import styled, { css } from "styled-components";
import Link from "gatsby-link";
import LoadingIndicator from "../LoadingIndicator";

export const ButtonComponent = styled.button`
  height: 34px;
  font-size: 1rem;
  display: inline-flex;
  line-height: 1;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 3px;
  background: transparent;
  color: #607d8b;
  border: solid 1px #ddd;
  box-sizing: border-box;
  outline: 0;
  cursor: pointer;
  position: relative;
  ${props =>
    props.size === "large" &&
    css`
      height: 38px;
      padding-left: 1rem;
      padding-right: 1rem;
    `};
  ${props =>
    (props.disabled || props.processing) &&
    css`
      border-color: #999;
      color: #999;
      cursor: default;
    `};
  ${props =>
    props.block &&
    css`
      height: 38px;
      display: flex;
      width: 100%;
    `};
  &:hover {
    background: ${props =>
      props.disabled || props.processing
        ? "transparent"
        : "rgba(236, 239, 241, 0.6)"};
    border-color: ${props =>
      props.disabled || props.processing ? "#999" : "#ddd"};
    color: ${props =>
      props.disabled || props.processing ? "#999" : "#607d8b"};
  }
`;

const ButtonChildren = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
`;

const LoadingIndicatorBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 3px;
  display: none;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const ChildrenText = styled.span`
  ${props =>
    props.processing &&
    css`
      opacity: 0;
    `};
`;

export const LinkButton = ButtonComponent.withComponent(Link);

export const URLButton = ButtonComponent.withComponent("a");

export default function Button(props) {
  if (props.to) {
    return (
      <LinkButton {...props}>
        <Children {...props} />
      </LinkButton>
    );
  }
  if (props.href) {
    return (
      <URLButton {...props}>
        <Children {...props} />
      </URLButton>
    );
  }
  return (
    <ButtonComponent {...props}>
      <Children {...props} />
    </ButtonComponent>
  );
}

function Children({ children, processing }) {
  return (
    <ButtonChildren>
      <ChildrenText processing={processing}>{children}</ChildrenText>
      {processing && (
        <LoadingIndicatorBox active={processing}>
          <LoadingIndicator />
        </LoadingIndicatorBox>
      )}
    </ButtonChildren>
  );
}
