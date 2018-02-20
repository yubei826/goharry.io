import React, { PureComponent } from "react";
import { navigateTo } from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SearchIcon, CancelIcon } from "../Icons";

const SearchBoxContainer = styled.div`
  background: #eceff1;
  padding: 2rem 0;
`;

const SearchInputBox = styled.div`
  background: #fff;
  border-radius: 2px;
  height: 44px;
  display: flex;
  padding-right: 1rem;
  align-items: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0 1rem;
  height: 1.2rem;
  font-size: 1.1rem;
  border: none;
  outline: 0;
  background: transparent;
`;

const IconButton = styled.button`
  background: transparent;
  padding: 0;
  border: none;
  margin: 0;
  line-height: 1;
`;

export default class SearchBox extends PureComponent {
  constructor(props) {
    super(props);
    this.input = undefined;
    const query = props.query || "";
    this.state = {
      query
    };
    this.lastQuery = query;
    this.input = undefined;
  }

  static propTypes = {
    refine: PropTypes.func.isRequired,
    isSearchStalled: PropTypes.bool.isRequired,
    query: PropTypes.string
  };

  componentDidMount() {
    if (this.state.query) {
      this.props.refine(this.state.query);
    }
    this.focus();
  }

  focus() {
    this.input.focus();
  }

  changeHandle(e) {
    const query = e.target.value;
    if (query === this.state.query) return;
    this.setState({ query });
  }

  submitHandle(e) {
    e.preventDefault();
    // if (!this.props.isSearchStalled) return;
    let { query } = this.state;
    query = query.trim();
    if (!query || query === this.lastQuery) return;
    this.lastQuery = query;
    this.props.refine(query);
    navigateTo(`/search?q=${query}`);
  }

  clearHandle() {
    this.setState({ query: "" });
    this.focus();
  }

  render() {
    let { query } = this.state;
    query = query.trim();
    return (
      <SearchBoxContainer>
        <div className="content">
          <form onSubmit={this.submitHandle.bind(this)}>
            <SearchInputBox>
              <SearchInput
                value={query}
                onChange={this.changeHandle.bind(this)}
                placeholder="Search"
                innerRef={input => (this.input = input)}
              />
              <CancelIcon
                size={24}
                color="#CFD8DC"
                style={{
                  marginRight: "0.5rem",
                  display: !query ? "none" : ""
                }}
                onClick={this.clearHandle.bind(this)}
              />
              <IconButton>
                <SearchIcon
                  size={24}
                  color={
                    !query || query === this.lastQuery ? "#CFD8DC" : "#607d8b"
                  }
                />
              </IconButton>
            </SearchInputBox>
          </form>
        </div>
      </SearchBoxContainer>
    );
  }
}
