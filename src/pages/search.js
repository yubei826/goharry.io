import React, { Component } from "react";
import { InstantSearch } from "react-instantsearch/dom";
import Search from "../components/Search";
import qs from "qs";
import { navigateTo } from "gatsby-link";
import styled from "styled-components";

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
  }

  render() {
    return (
      <InstantSearch
        appId="ZO2N7VNXMJ"
        apiKey="f3e2e9cec1c8614d0d2493b7f2f766a5"
        indexName="goharry.io"
      >
        <Search query={this.state.query} />
      </InstantSearch>
    );
  }
}

function getQuery(location) {
  const { search } = location;
  const queries = qs.parse(search.slice(1));
  return queries.q ? queries.q : "";
}
