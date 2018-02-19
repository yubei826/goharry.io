import React, { PureComponent } from "react";
import styled from "styled-components";
import { navigateTo } from "gatsby-link";

const SearchInputBox = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  margin-right: 0.5rem;
`;

const SearchInput = styled.input`
  height: 18px;
  width: 3rem;
  border: none;
  background: transparent;
  flex: 1;
  outline: 0;
  padding: 0 0.5rem;
  transition: width 0.3s linear;
  font-size: 16px;
  &::placeholder {
    color: #607d8b;
    font-weight: 400;
    font-size: 16px;
  }
  &:focus {
    width: 10rem;
  }
`;

export default class SearchBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.input = undefined;
  }
  changeHandle({ target }) {
    const query = target.value;
    this.setState({ query });
  }
  submitHandle(e) {
    e.preventDefault();
    navigateTo(`/search?q=${this.state.query}`);
  }
  focus() {
    this.input.focus();
  }
  render() {
    return (
      <form onSubmit={this.submitHandle.bind(this)}>
        <SearchInputBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search"
            value={this.state.query}
            onChange={this.changeHandle.bind(this)}
            onBlur={this.props.toggleSearch}
            innerRef={input => (this.input = input)}
          />
        </SearchInputBox>
      </form>
    );
  }
}

export function SearchIcon({ size, color, onClick }) {
  return (
    <svg
      onClick={onClick}
      fill="#607d8b"
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}

SearchIcon.defaultProps = {
  size: 24,
  color: "#607d8b"
};
