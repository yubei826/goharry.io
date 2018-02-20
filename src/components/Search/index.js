import React from "react";
import {
  connectStateResults,
  connectSearchBox,
  connectPoweredBy
} from "react-instantsearch/connectors";
import styled, { css } from "styled-components";
import SearchResults from "./Results";
import SearchBox from "./SearchBox";
import PoweredBy from "./PoweredBy";

const SearchPage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Results = connectStateResults(SearchResults);

const Search = connectSearchBox(SearchBox);

const Power = connectPoweredBy(PoweredBy);

export default function SearchResult({ query }) {
  return (
    <SearchPage>
      <Search query={query} />
      <Results />
      <Power />
    </SearchPage>
  );
}
