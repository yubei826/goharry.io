import React from "react";
import { Highlight, SearchBox, PoweredBy } from "react-instantsearch/dom";
import { connectStateResults } from "react-instantsearch/connectors";
import Link from "gatsby-link";
import styled from "styled-components";

export default function SearchResult({ query, onChange, onReset }) {
  return (
    <div className="search-page">
      <MyHits />
      <PoweredBy />
    </div>
  );
}

const MyHits = connectStateResults(Hits);

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

function Hits({ searchState, searchResults }) {
  const hs =
    searchResults && searchState && searchResults.hits
      ? searchResults.hits.map(hit => <Post hit={hit} key={hit.fields.slug} />)
      : null;
  return <div id="hits">{hs}</div>;
}
