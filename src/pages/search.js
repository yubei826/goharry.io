import React, { Component } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch/dom";
import SearchResults from "../components/Search";
import qs from "qs";
import { navigateTo } from "gatsby-link";
import styled from "styled-components";
import "../assets/search.css";

const SearchFormBox = styled.div`
  background: #eceff1;
  padding: 3rem 0;
`;

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const query = getQuery(location);
    this.state = {
      query
    };
    this.query = query;
  }

  changeHandle({ target }) {
    const value = target.value;
    this.query = value;
  }
  submitHandle(e) {
    e.preventDefault();
    const { location } = this.props;
    const { search } = location;
    const queries = qs.parse(search.slice(1));
    navigateTo({
      pathname: location.pathname,
      search: "?" + qs.stringify({ ...queries, q: this.query })
    });
    this.setState({ query: this.query });
  }
  render() {
    return (
      <InstantSearch
        appId="ZO2N7VNXMJ"
        apiKey="f3e2e9cec1c8614d0d2493b7f2f766a5"
        indexName="goharry.io"
      >
        <SearchFormBox>
          <div className="content">
            <SearchBox
              defaultRefinement={this.state.query}
              searchAsYouType={false}
              autoFocus={false}
              onSubmit={this.submitHandle.bind(this)}
              onChange={this.changeHandle.bind(this)}
            />
          </div>
        </SearchFormBox>
        <div className="content">
          <SearchResults />
        </div>
      </InstantSearch>
    );
  }
}

function getQuery(location) {
  const { search } = location;
  const queries = qs.parse(search.slice(1));
  return queries.q ? queries.q : "";
}
