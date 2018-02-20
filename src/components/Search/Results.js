import React from "react";
import { Highlight } from "react-instantsearch/dom";
import styled, { css } from "styled-components";
import LoadingIndicator from "../LoadingIndicator";
import Link from "gatsby-link";

const SearchResultsContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function SearchResults({
  searchState,
  searchResults,
  searching,
  isSearchStalled,
  error
}) {
  return (
    <div
      className="content"
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <SearchResultsContainer>
        <Results
          searchResults={searchResults}
          searchState={searchState}
          error={error}
        />
        <SearchLoadingIndicator active={searching} />
      </SearchResultsContainer>
    </div>
  );
}

function Results({ searchResults, searchState, error }) {
  if (error) {
    return <ErrorResults />;
  }
  if (searchResults && searchState && searchResults.hits.length) {
    return (
      <div>
        {searchResults.hits.map(hit => (
          <Post hit={hit} key={hit.fields.slug} />
        ))}
      </div>
    );
  }
  if (searchResults && searchState && !searchResults.hits.length) {
    return (
      <EmptyResults>
        No search results for keyword <em>{searchResults.query}</em>
      </EmptyResults>
    );
  }
  return null;
}

const PostTitle = styled.h1`
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  a {
    color: #333;
    &:hover {
      color: #607d8b;
    }
    em {
      color: #f57f17;
      font-style: normal;
    }
  }
`;

const Excerpt = styled.div`
  color: #999;
  line-height: 1.7;
  em {
    color: #f57f17;
    font-style: normal;
  }
`;

const SearchPost = styled.div`
  margin: 2rem 0;
`;

function Post({ hit, onClose }) {
  return (
    <SearchPost>
      <PostTitle>
        <Link to={hit.fields.slug}>
          <Highlight attributeName="frontmatter.title" hit={hit} />
        </Link>
      </PostTitle>
      <Excerpt>
        <Highlight attributeName="excerpt" hit={hit} />
      </Excerpt>
    </SearchPost>
  );
}

const LoadingIndicatorLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  display: none;
  align-items: center;
  justify-content: center;
  ${props =>
    props.active &&
    css`
      display: flex;
    `};
`;

function SearchLoadingIndicator({ active }) {
  return (
    <LoadingIndicatorLayout active={active}>
      <LoadingIndicator
        segmentWidth={3}
        segmentLength={6}
        spacing={3}
        segments={12}
      />
    </LoadingIndicatorLayout>
  );
}

const EmptyText = styled.p`
  color: #999;
  em {
    color: #607d8b;
    font-style: normal;
    font-weight: 700;
  }
`;

const EmptyContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function EmptyResults({ children }) {
  return (
    <EmptyContent>
      <svg
        fill="#607d8b"
        height="48"
        viewBox="0 0 24 24"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" />
      </svg>
      <EmptyText>{children}</EmptyText>
    </EmptyContent>
  );
}

function ErrorResults() {
  return (
    <EmptyContent>
      <svg
        fill="#607d8b"
        height="48"
        viewBox="0 0 24 24"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z" />
      </svg>
      <p>Something wrong :(</p>
    </EmptyContent>
  );
}
