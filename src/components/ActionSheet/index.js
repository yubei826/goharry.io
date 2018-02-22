import React, { PureComponent } from "react";
import styled, { css } from "styled-components";

const ActionSheetLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 11;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.3s, opacity 0s 0.3s;
  ${props =>
    props.active &&
    css`
      transition: none;
      visibility: visible;
      opacity: 1;
    `};
`;

const ActionSheetMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
`;

const ActionSheetBox = styled.div`
  position: absolute;
  bottom: 2rem;
  background: #fff;
  width: 400px;
  left: 50%;
  margin-left: -200px;
  border-radius: 4px;
  padding: 1rem;
  box-sizing: border-box;
  transform: translateY(calc(100% + 2rem));
  transition: all 0.3s;
  @media (max-width: 400px) {
    border-radius: 0;
    transform: translateY(100%);
    width: 100%;
    left: 0;
    margin-left: 0;
    bottom: 0;
    ${props =>
      props.active &&
      css`
        transform: translateY(0);
      `};
  }
  ${props =>
    props.active &&
    css`
      transform: translateY(0);
    `};
`;

export default class ActionSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggle() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { active } = this.state;
    return (
      <ActionSheetLayer active={active}>
        <ActionSheetMask onClick={this.toggle.bind(this)} />
        <ActionSheetBox active={active}>{this.props.children}</ActionSheetBox>
      </ActionSheetLayer>
    );
  }
}
