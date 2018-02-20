import React, { PureComponent } from "react";
import styled from "styled-components";
import { navigateTo } from "gatsby-link";
import { SearchIcon } from "../Icons";

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
          <SearchIcon color="#607d8b" size={24} />
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
